import { useState } from "react";
import { BASE, BLUE, CREAM, MUTED, WHITE, PROGRAMS, DEPT_FILTERS } from "../data";
import PageHero from "../components/PageHero";
import ProgramCard from "../components/ProgramCard";
import Reveal from "../components/Reveal";

export default function Programs() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? PROGRAMS : PROGRAMS.filter(p => p.dept === filter);

  return (
    <>
      <PageHero eyebrow="Academics" title="Degree Programs"
        subtitle="Nine full degree programs across arts and sciences, computing, health, education, governance, and criminal justice."
        img={`${BASE}/slides/image4.jpeg`} />

      <section style={{ padding: "80px 32px 100px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
            {DEPT_FILTERS.map(f => {
              const active = filter === f.full;
              return (
                <button key={f.full} onClick={() => setFilter(f.full)} style={{
                  padding: "8px 18px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                  borderRadius: 40, border: "1px solid",
                  borderColor: active ? BLUE : "rgba(10,22,40,0.15)",
                  background: active ? BLUE : "transparent",
                  color: active ? WHITE : MUTED, cursor: "pointer", transition: "all 0.15s",
                }}>{f.short}</button>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="prog-grid">
            {list.map((p, i) => <Reveal key={p.code} delay={(i % 3) * 70}><ProgramCard p={p} /></Reveal>)}
          </div>

          {list.length === 0 && (
            <p style={{ textAlign: "center", color: MUTED, fontFamily: "'Lora', serif", fontSize: 16, padding: "40px 0" }}>
              No programs in this college yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

