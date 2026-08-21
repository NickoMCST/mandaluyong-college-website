import { Link } from "react-router";
import { BASE, LOGO_URL, BLUE, BLUE_DEEP, BLUE_MID, CREAM, CREAM_DARK, INK, MUTED, WHITE } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const VALUES = [
  { t: "Academic Excellence",  d: "Rigorous, relevant programs that meet national standards and prepare graduates for the board and the workplace." },
  { t: "Community Service",    d: "Learning that reaches beyond the campus — health drives, literacy programs, and outreach across Mandaluyong." },
  { t: "Integrity & Ethics",   d: "We form citizens who lead honestly and act with a strong sense of public responsibility." },
  { t: "Inclusive Education",  d: "Accessible, values-based education open to every learner in the city and its surrounding communities." },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About the College" title="Where Science Meets Purpose and Service"
        subtitle="Mandaluyong College of Science and Technology exists to serve the educational needs of Mandaluyong City through quality, accessible, and values-based education."
        img={`${BASE}/background.jpeg`} />

      {/* Story */}
      <section style={{ padding: "100px 32px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: 80, alignItems: "start" }} className="about-grid">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, marginBottom: 18 }}>Our Story</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.15, color: INK, marginBottom: 30 }}>
              An institution built for its city
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 16.5, lineHeight: 1.85, color: "#374151", marginBottom: 22 }}>
              MCST was established to serve the educational needs of Mandaluyong City and the surrounding areas, offering degree programs rooted in rigorous academic standards and genuine community relevance.
            </p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 16.5, lineHeight: 1.85, color: "#374151" }}>
              Our programs are designed not just to produce professionals, but citizens who lead with integrity and serve the public good — in science, technology, education, health, governance, and public service.
            </p>

            <div style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: 24, marginTop: 40 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: INK, marginBottom: 8, lineHeight: 1.4 }}>
                "Education that transforms individuals and uplifts communities."
              </div>
              <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}>Illustrative Mission Statement — Concept Content</div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <img src={`${BASE}/campus.jpg`} alt="The MCST campus" loading="lazy" decoding="async"
              style={{ width: "100%", display: "block", borderRadius: 2, boxShadow: "0 24px 60px rgba(0,0,0,0.16)", background: CREAM_DARK }} />
            <img src={LOGO_URL} alt="MCST seal" style={{ position: "absolute", bottom: -24, left: -24, width: 104, height: 104, objectFit: "contain", filter: "drop-shadow(0 10px 26px rgba(10,22,40,0.35))" }} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 32px", background: BLUE_DEEP }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>What We Stand For</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: WHITE, lineHeight: 1.15, marginBottom: 52 }}>
            Institutional Values
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }} className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={(i % 2) * 90}>
                <div style={{ background: BLUE_DEEP, padding: "40px 36px", height: "100%" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: BLUE_MID, marginBottom: 14 }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: WHITE, marginBottom: 10 }}>{v.t}</h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link to="/programs" style={{ padding: "13px 30px", background: BLUE, color: WHITE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.background = BLUE_MID)}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
              Explore Our Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
