import { useState } from "react";
import { BLUE, BLUE_DEEP, CREAM, CREAM_DARK, INK, MUTED, WHITE, PROGRAMS, DEPT_FILTERS, PAGE_HERO } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useImg } from "../lib/imageOverrides";

export default function Programs() {
  const img = useImg();
  const [filter, setFilter] = useState("All");
  const [selectedCode, setSelectedCode] = useState(
    PROGRAMS.find(p => p.featured)?.code ?? PROGRAMS[0].code
  );

  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter(p => p.dept === filter);
  const featured = filtered.find(p => p.code === selectedCode) ?? filtered[0];
  const rest = filtered.filter(p => p.code !== featured?.code);

  return (
    <>
      <PageHero eyebrow="Academics" title="Degree Programs"
        subtitle="Nine full degree programs across arts and sciences, computing, health, education, governance, and criminal justice."
        img={img("pageHero.programs", PAGE_HERO.programs)} />

      <section style={{ padding: "72px 32px 100px", background: CREAM }} className="programs-section">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>

          {/* ── Section heading + filter tabs ── */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderBottom: `2px solid ${BLUE}`, paddingBottom: 20 }} className="programs-heading-row">
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, fontWeight: 600, margin: "0 0 10px" }}>
                Academic Catalog
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, color: INK, margin: 0, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                Featured Programs
              </h2>
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: MUTED, lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
              Nine CHED-accredited programs across six colleges, built around rigorous standards and community relevance.
            </p>
          </div>

          <div style={{ display: "flex", gap: 0, overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${CREAM_DARK}` }}>
            {DEPT_FILTERS.map(f => {
              const active = filter === f.full;
              return (
                <button
                  key={f.full}
                  onClick={() => {
                    setFilter(f.full);
                    const firstInDept = f.full === "All" ? PROGRAMS[0] : PROGRAMS.find(p => p.dept === f.full);
                    if (firstInDept) setSelectedCode(firstInDept.code);
                  }}
                  style={{
                    background: "none", border: "none",
                    borderBottom: active ? `2px solid ${BLUE}` : "2px solid transparent",
                    marginBottom: -1, padding: "14px 18px", fontSize: 12,
                    fontWeight: active ? 600 : 400, color: active ? BLUE : "#9ca3af",
                    cursor: "pointer", letterSpacing: "0.05em", whiteSpace: "nowrap",
                    fontFamily: "inherit", transition: "color 0.15s",
                  }}
                >
                  {f.short}
                </button>
              );
            })}
          </div>

          {/* ── Featured card + accordion list ── */}
          {featured && (
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: rest.length > 0 ? "1fr 380px" : "1fr", gap: 2, alignItems: "start", marginTop: 40 }} className="programs-catalog-grid">
                <div style={{ background: BLUE_DEEP, padding: "48px 44px 44px", position: "relative", overflow: "hidden" }} className="programs-featured-panel">
                  <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, opacity: 0.05, pointerEvents: "none" }}>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} style={{ position: "absolute", top: i * 28, right: 0, width: "100%", height: 1, background: WHITE, transform: "rotate(-45deg)", transformOrigin: "right top" }} />
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }} className="programs-featured-head">
                    <div style={{ width: 64, height: 64, borderRadius: 8, background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }} className="programs-featured-logo">
                      <img src={img(`program.${featured.code}`, featured.img)} alt={featured.title} style={{ width: 56, height: 56, objectFit: "contain" }} />
                    </div>
                    <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                      {featured.dept}
                    </div>
                  </div>

                  <div style={{ fontSize: 70, fontFamily: "'Playfair Display', serif", fontWeight: 300, color: "rgba(255,255,255,0.08)", lineHeight: 1, marginBottom: 4, letterSpacing: "-0.03em" }} className="programs-featured-code">
                    {featured.code}
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: WHITE, lineHeight: 1.2, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
                    {featured.title}
                  </h3>

                  <div style={{ height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 24 }} />

                  <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.68)", margin: "0 0 36px" }}>
                    {featured.desc}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }} className="programs-cta-row">
                    <button style={{ background: WHITE, color: BLUE_DEEP, border: "none", padding: "12px 28px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      Learn More
                    </button>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
                      {featured.year}
                    </span>
                  </div>
                </div>

                {rest.length > 0 && (
                <div style={{ background: CREAM_DARK, display: "flex", flexDirection: "column" }} className="programs-catalog-list">
                  {rest.map((prog, i) => (
                    <button
                      key={prog.code}
                      onClick={() => setSelectedCode(prog.code)}
                      className="programs-catalog-row"
                      style={{
                        width: "100%", background: "none", border: "none",
                        borderBottom: "1px solid rgba(10,22,40,0.1)",
                        borderLeft: `3px solid transparent`,
                        padding: "18px 24px 18px 21px", display: "flex", alignItems: "center", gap: 16,
                        cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,22,40,0.05)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
                    >
                      <span style={{ fontSize: 10, color: "#b0a898", fontWeight: 600, letterSpacing: "0.1em", width: 20, flexShrink: 0, textAlign: "right" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div style={{ width: 36, height: 36, borderRadius: 4, background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                        <img src={img(`program.${prog.code}`, prog.img)} alt={prog.short} loading="lazy" decoding="async" style={{ width: 30, height: 30, objectFit: "contain" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: INK, lineHeight: 1.3 }}>
                          {prog.short}
                        </div>
                        <div style={{ fontSize: 10, color: MUTED, letterSpacing: "0.06em", marginTop: 2 }}>
                          {prog.dept}
                        </div>
                      </div>
                      <svg viewBox="0 0 12 12" fill="none" stroke="#c9c0b3" strokeWidth="1.5" style={{ width: 12, height: 12, flexShrink: 0 }}>
                        <path d="M4 2l4 4-4 4" />
                      </svg>
                    </button>
                  ))}
                </div>
                )}
              </div>
            </Reveal>
          )}

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: MUTED, fontFamily: "'Lora', serif", fontSize: 16, padding: "40px 0" }}>
              No programs in this college yet.
            </p>
          )}

          {/* ── Footer note ── */}
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>
              All programs are accredited by the Commission on Higher Education (CHED), Republic of the Philippines.
            </p>
            
              href="#"
              style={{ fontSize: 12, fontWeight: 600, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderBottom: `1px solid ${BLUE}`, paddingBottom: 2 }}
            >
              Download Program Guide
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
