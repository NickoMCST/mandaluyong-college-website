import { BLUE_DEEP, WHITE } from "../data";

/** Compact banner used at the top of every interior page. */
export default function PageHero({ eyebrow, title, subtitle, img }: {
  eyebrow: string; title: string; subtitle?: string; img: string;
}) {
  return (
    <section style={{ position: "relative", background: BLUE_DEEP, overflow: "hidden", paddingTop: 102 }}>
      <img src={img} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.6), rgba(10,22,40,0.9))" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "72px 32px 80px", animation: "fadeUp 0.7s ease both" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
          {eyebrow}
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 700, color: WHITE, lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 780 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.6vw, 1.15rem)", color: "rgba(255,255,255,0.62)", lineHeight: 1.75, marginTop: 22, maxWidth: 620 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
