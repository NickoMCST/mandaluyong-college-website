import { useState, useEffect } from "react";
import { Link } from "react-router";
import { BASE, LOGO_URL, BLUE, BLUE_DEEP, BLUE_MID, CREAM, CREAM_DARK, INK, MUTED, WHITE, PROGRAMS, MOSAIC, ANNOUNCE, HERO_SLIDES, QUICKLINKS, NEWS } from "../data";
import ProgramCard from "../components/ProgramCard";
import Reveal from "../components/Reveal";

export default function Home() {
  const [slide, setSlide] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % total), 6500);
    return () => clearInterval(t);
  }, [total]);

  const s = HERO_SLIDES[slide];

  return (
    <>
      {/* HERO CAROUSEL */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: BLUE_DEEP }}>
        {HERO_SLIDES.map((sl, i) => (
          <img key={i} src={sl.img} alt="" aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === slide ? 0.44 : 0, transition: "opacity 1s ease", transform: i === slide ? "scale(1.04)" : "scale(1)", transitionProperty: "opacity, transform", transitionDuration: "1s, 7s" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.55) 45%, rgba(10,22,40,0.92) 82%, #0a1628 100%)" }} />
        <div style={{ position: "absolute", left: 32, top: 140, bottom: 120, width: 1, background: "rgba(255,255,255,0.08)" }} className="hero-rule" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 32px 84px", width: "100%" }}>
          <div key={slide} style={{ maxWidth: 830, animation: "fadeUp 0.8s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <img src={LOGO_URL} alt="MCST seal" style={{ width: 56, height: 56, objectFit: "contain", filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.5))" }} />
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{s.kicker}</div>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 6.5vw, 5rem)", fontWeight: 700, lineHeight: 1.06, color: WHITE, marginBottom: 30, letterSpacing: "-0.02em" }}>
              <span style={{ display: "block", marginBottom: 6 }}>{s.title}</span>
              <span style={{ display: "block", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{s.titleItalic}</span>
            </h1>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.68)", marginBottom: 40, maxWidth: 560 }}>{s.body}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to={s.ctaTo} style={btnPrimary}
                onMouseEnter={e => { e.currentTarget.style.background = BLUE_MID; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = "none"; }}>{s.ctaLabel}</Link>
              <Link to={s.altTo} style={btnGhost}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; e.currentTarget.style.color = WHITE; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>{s.altLabel}</Link>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {HERO_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} style={{
                  width: i === slide ? 34 : 10, height: 4, borderRadius: 4, border: "none", cursor: "pointer",
                  background: i === slide ? BLUE_MID : "rgba(255,255,255,0.25)", transition: "all 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
              {String(slide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT MARQUEE */}
      <div style={{ background: BLUE, overflow: "hidden", whiteSpace: "nowrap", padding: "11px 0" }}>
        <div className="marquee-track" style={{ display: "inline-flex", animation: "marquee 28s linear infinite" }}>
          {[...ANNOUNCE, ...ANNOUNCE].map((a, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.92)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <span style={{ padding: "0 26px" }}>{a}</span><span style={{ opacity: 0.5 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* QUICK LINKS BAND */}
      <section style={{ background: BLUE_DEEP, padding: "0 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)", transform: "translateY(-1px)" }} className="quick-grid">
          {QUICKLINKS.map(q => (
            <Link key={q.label} to={q.to} style={{ background: BLUE_DEEP, padding: "30px 26px", textDecoration: "none", transition: "background 0.2s", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(21,101,192,0.16)")}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE_DEEP)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: WHITE }}>{q.label}</span>
                <span style={{ color: BLUE_MID, fontSize: 18 }}>→</span>
              </div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>{q.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* WELCOME */}
      <section style={{ padding: "100px 32px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: 80, alignItems: "center" }} className="about-grid">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, marginBottom: 18 }}>Welcome to MCST</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.12, color: INK, marginBottom: 28 }}>
              Where Science Meets<br /><em style={{ fontWeight: 400, color: "#374151" }}>Purpose and Service</em>
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 16.5, lineHeight: 1.85, color: "#374151", marginBottom: 24, maxWidth: 560 }}>
              Mandaluyong College of Science and Technology offers degree programs rooted in rigorous academic standards and genuine community relevance — shaping professionals who lead with integrity and serve the public good.
            </p>
            <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: BLUE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Read our story →</Link>
          </div>
          <div style={{ position: "relative" }}>
            <img src={`${BASE}/campus.jpg`} alt="The MCST campus" loading="lazy" decoding="async" style={{ width: "100%", display: "block", borderRadius: 2, boxShadow: "0 24px 60px rgba(0,0,0,0.16)", background: CREAM_DARK }} />
            <img src={LOGO_URL} alt="MCST seal" style={{ position: "absolute", bottom: -24, left: -24, width: 104, height: 104, objectFit: "contain", filter: "drop-shadow(0 10px 26px rgba(10,22,40,0.35))" }} />
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section style={{ padding: "100px 32px", background: CREAM_DARK }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, marginBottom: 14 }}>Academics</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>Featured Programs</h2>
            </div>
            <Link to="/programs" style={{ color: BLUE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>All 9 programs →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="prog-grid">
            {PROGRAMS.slice(0, 6).map((p, i) => <Reveal key={p.code} delay={(i % 3) * 80}><ProgramCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* NEWS HUB */}
      <section style={{ padding: "100px 32px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, marginBottom: 14 }}>Campus Bulletin</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>Latest News</h2>
              <p style={{ fontSize: 12.5, color: MUTED, marginTop: 6, fontStyle: "italic" }}>Illustrative content for this concept project — not real announcements.</p>
            </div>
            <Link to="/events" style={{ color: BLUE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>All updates →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="prog-grid">
            {NEWS.map((n, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <Link to="/events" style={{ textDecoration: "none", display: "block", background: WHITE, borderRadius: 3, overflow: "hidden", border: "1px solid rgba(10,22,40,0.07)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(10,22,40,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: CREAM_DARK }}>
                    <img src={n.img} alt={n.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: "22px 22px 26px" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: WHITE, background: BLUE, padding: "3px 8px", borderRadius: 1 }}>{n.tag}</span>
                      <span style={{ fontSize: 12, color: MUTED }}>{n.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: INK, lineHeight: 1.3, marginBottom: 8 }}>{n.title}</h3>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{n.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS PREVIEW MOSAIC */}
      <section style={{ padding: "100px 32px", background: CREAM_DARK }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, marginBottom: 14 }}>Campus Moments</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>Life at MCST</h2>
            </div>
            <Link to="/campus" style={{ color: BLUE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>See campus life →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "240px 240px", gap: 3 }} className="mosaic">
            {MOSAIC.map((g, i) => (
              <div key={i} style={{ gridArea: g.span, position: "relative", overflow: "hidden", background: "#dcdcd6" }}>
                <img src={g.src} alt={g.label} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s, filter 0.4s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.transform = "scale(1.04)"; (e.target as HTMLElement).style.filter = "brightness(0.75)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.transform = "scale(1)"; (e.target as HTMLElement).style.filter = "brightness(1)"; }} />
                <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 32px", background: BLUE_DEEP, textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <img src={LOGO_URL} alt="MCST seal" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 24, filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))" }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: WHITE, lineHeight: 1.15, marginBottom: 18 }}>Begin your journey with us</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 36 }}>
            Admissions for A.Y. 2026–2027 are now open. Reach out to our admissions office and take the first step.
          </p>
          <Link to="/contact" style={{ ...btnPrimary, display: "inline-block" }}
            onMouseEnter={e => { e.currentTarget.style.background = BLUE_MID; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = "none"; }}>Apply Now</Link>
        </div>
      </section>
    </>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "13px 28px", background: BLUE, color: WHITE, fontWeight: 700, fontSize: 12,
  letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none",
  transition: "background 0.15s, transform 0.15s",
};
const btnGhost: React.CSSProperties = {
  padding: "13px 28px", background: "transparent", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: 12,
  letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.22)", transition: "border-color 0.15s, color 0.15s",
};
