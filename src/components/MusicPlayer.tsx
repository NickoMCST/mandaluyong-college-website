import { useEffect, useRef, useState } from "react";
import { BLUE_DEEP, BLUE_MID, WHITE } from "../data";

// Remembers an explicit "off" choice across visits so the site never
// re-nags a visitor who deliberately silenced it.
const STORAGE_KEY = "mcst-music-pref";

/**
 * A quiet, persistent background-music control. Lives in <Root /> so it
 * mounts once for the whole session and keeps playing across route
 * changes instead of restarting on every page.
 *
 * Autoplay-with-sound is blocked by every modern browser until the
 * visitor interacts with the page, so this component:
 *   1. Tries to start immediately (works for returning visitors whose
 *      browser has already granted this site an autoplay allowance).
 *   2. Otherwise starts on the visitor's very first interaction
 *      anywhere on the page (a click, tap, or key press) — so the
 *      theme still greets them within the first moment on the site.
 *   3. Always starts reliably on a direct tap of the button itself,
 *      which browsers always treat as a valid user gesture.
 * Volume fades in/out smoothly rather than cutting in abruptly.
 */
export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const fadeTo = (target: number, ms: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    const from = audio.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      audio.volume = from + (target - from) * t;
      if (t < 1) fadeFrame.current = requestAnimationFrame(step);
    };
    fadeFrame.current = requestAnimationFrame(step);
  };

  const start = () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return; // already playing
    audio.volume = 0;
    audio.play().then(() => {
      setPlaying(true);
      setShowHint(false);
      fadeTo(0.4, 1800);
    }).catch(() => {
      /* still blocked — will retry on the next interaction */
    });
  };

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "off") return;

    start();

    const onFirstInteraction = () => start();
    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    const showTimer = window.setTimeout(() => setShowHint(true), 900);
    const hideTimer = window.setTimeout(() => setShowHint(false), 6500);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setShowHint(false);
    if (playing) {
      localStorage.setItem(STORAGE_KEY, "off");
      fadeTo(0, 450);
      window.setTimeout(() => audio.pause(), 470);
      setPlaying(false);
    } else {
      localStorage.setItem(STORAGE_KEY, "on");
      start();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <div style={{ position: "fixed", bottom: 26, left: 26, zIndex: 90, display: "flex", alignItems: "center", gap: 12, animation: "fadeUp 0.6s ease 0.3s both" }}>
        {showHint && !playing && (
          <span style={{
            background: BLUE_DEEP, color: WHITE, fontSize: 12, fontWeight: 500,
            padding: "8px 14px", borderRadius: 20, whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(10,22,40,0.3)", animation: "fadeUp 0.4s ease both",
            fontFamily: "'Lora', serif", pointerEvents: "none",
          }}>
            ♪ Tap for the campus theme
          </span>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          style={{
            position: "relative", width: 46, height: 46, borderRadius: "50%", border: "none", cursor: "pointer",
            background: BLUE_DEEP, color: WHITE, boxShadow: "0 8px 24px rgba(10,22,40,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = BLUE_MID; e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = BLUE_DEEP; e.currentTarget.style.transform = "none"; }}
        >
          {!playing && (
            <span aria-hidden style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              border: `1.5px solid ${BLUE_MID}`, animation: "ringPulse 2.4s ease-out infinite",
            }} />
          )}
          {playing ? <EqIcon /> : <NoteIcon />}
        </button>
      </div>
    </>
  );
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function EqIcon() {
  const bar = (delay: string): React.CSSProperties => ({
    width: 3, background: "currentColor", borderRadius: 2,
    animation: `eqBar 0.9s ease-in-out infinite ${delay}`,
  });
  return (
    <span aria-hidden style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 16 }}>
      <span style={bar("0s")} />
      <span style={bar("0.2s")} />
      <span style={bar("0.4s")} />
    </span>
  );
}
