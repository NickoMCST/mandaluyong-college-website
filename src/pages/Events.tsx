import { useState } from "react";
import { BASE, BLUE, BLUE_DEEP, CREAM, INK, MUTED, WHITE, EVENTS } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export default function Events() {
  const [active, setActive] = useState(0);

  return (
    <>
      <PageHero eyebrow="Updates" title="Recent Events"
        subtitle="Illustrative event listings for this concept project — dates and details are for demonstration, not an official MCST calendar."
        img={`${BASE}/RecentEvents/1.jpeg`} />

      <section style={{ padding: "90px 32px 100px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Featured */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 3, alignItems: "stretch", marginBottom: 72 }} className="events-layout">
            <div style={{ position: "relative", overflow: "hidden", background: BLUE_DEEP, minHeight: 440 }}>
              {EVENTS.map((ev, i) => (
                <img key={i} src={ev.img} alt={ev.title} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: active === i ? 0.5 : 0, transition: "opacity 0.5s" }} />
              ))}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.3) 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 36px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <span style={{ padding: "3px 10px", background: BLUE, color: WHITE, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 1 }}>{EVENTS[active].tag}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{EVENTS[active].date}, {EVENTS[active].year}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: WHITE, marginBottom: 12, lineHeight: 1.2 }}>{EVENTS[active].title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 480 }}>{EVENTS[active].desc}</p>
              </div>
            </div>
            <div style={{ background: "#f0eee8", display: "flex", flexDirection: "column" }}>
              {EVENTS.map((ev, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  flex: 1, padding: "22px 28px", textAlign: "left", cursor: "pointer",
                  background: active === i ? WHITE : "transparent", border: "none",
                  borderLeft: active === i ? `3px solid ${BLUE}` : "3px solid transparent",
                  borderBottom: i < EVENTS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  transition: "background 0.15s, border-color 0.15s",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: active === i ? BLUE : MUTED, marginBottom: 8 }}>{ev.tag} — {ev.date}, {ev.year}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: active === i ? INK : "#4b5563", lineHeight: 1.3 }}>{ev.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* All events grid */}
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: INK, marginBottom: 36 }}>All Events</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }} className="values-grid">
            {EVENTS.map((ev, i) => (
              <Reveal key={i} delay={(i % 2) * 90}>
                <div className="events-card" style={{ display: "flex", gap: 20, background: WHITE, border: "1px solid rgba(10,22,40,0.07)", padding: 18, alignItems: "center", height: "100%" }}>
                  <img src={ev.img} alt={ev.title} loading="lazy" decoding="async" className="events-card-img" style={{ width: 120, height: 96, objectFit: "cover", flexShrink: 0, borderRadius: 2, background: "#dcdcd6" }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, marginBottom: 6 }}>{ev.tag} — {ev.date}, {ev.year}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: INK, lineHeight: 1.3, marginBottom: 6 }}>{ev.title}</h3>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: 13.5, color: MUTED, lineHeight: 1.6 }}>{ev.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
