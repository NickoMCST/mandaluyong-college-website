import { CREAM, MUTED, PAGE_HERO, CAMPUS_GALLERY } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useImg } from "../lib/imageOverrides";

export default function Campus() {
  const img = useImg();
  return (
    <>
      <PageHero eyebrow="Campus Moments" title="Life at MCST"
        subtitle="A community where learning extends beyond lecture halls — into service, ceremony, sport, and student life."
        img={img("pageHero.campus", PAGE_HERO.campus)} />

      <section style={{ padding: "90px 32px 100px", background: CREAM }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }} className="gallery-grid">
            {CAMPUS_GALLERY.map((g, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3", background: "#dcdcd6", borderRadius: 2 }}>
                  <img src={img(`campus.gallery.${i}`, g.src)} alt={g.label} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s, filter 0.4s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.transform = "scale(1.05)"; (e.target as HTMLElement).style.filter = "brightness(0.72)"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.transform = "scale(1)"; (e.target as HTMLElement).style.filter = "brightness(1)"; }} />
                  <span style={{ position: "absolute", bottom: 12, left: 14, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.92)", letterSpacing: "0.05em", textShadow: "0 1px 5px rgba(0,0,0,0.7)" }}>{g.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "'Lora', serif", fontSize: 15, color: MUTED, marginTop: 40, fontStyle: "italic" }}>
            Photographs from the MCST community.
          </p>
        </div>
      </section>
    </>
  );
}

