import { BLUE, BLUE_DARK, INK, MUTED, CREAM_DARK, WHITE } from "../data";
import { useImg } from "../lib/imageOverrides";

type Program = {
  code: string;
  title: string;
  short: string;
  dept: string;
  img: string;
  desc: string;
  year: string;
  featured: boolean;
};

// Real catalog card: logo, department, title, and description are all
// visible by default — nothing is hidden behind hover. Hover just lifts
// the card and warms the border, the way a physical prospectus page would
// catch the light.
export default function ProgramCard({ p }: { p: Program }) {
  const img = useImg();

  return (
    <div
      className="prog-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: WHITE,
        border: `1px solid ${p.featured ? BLUE : "rgba(10,22,40,0.12)"}`,
        borderRadius: 4,
        padding: "24px 22px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(10,22,40,0.12)";
        e.currentTarget.style.borderColor = BLUE;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = p.featured ? BLUE : "rgba(10,22,40,0.12)";
      }}
    >
      {p.featured && (
        <span
          style={{
            position: "absolute", top: 0, right: 22, transform: "translateY(-50%)",
            background: BLUE, color: WHITE, fontSize: 9.5, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "5px 10px", borderRadius: 2,
          }}
        >
          Featured
        </span>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div
          style={{
            width: 52, height: 52, borderRadius: 4, flexShrink: 0,
            background: CREAM_DARK, display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={img(`program.${p.code}`, p.img)}
            alt={`${p.code} logo`}
            loading="lazy"
            decoding="async"
            onError={e => {
              // Fall back to a text monogram rather than leaving a blank tile.
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const fallback = el.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }}
          />
          <span
            aria-hidden
            style={{
              display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center",
              fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: BLUE_DARK,
            }}
          >
            {p.code.slice(0, 4)}
          </span>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, marginBottom: 4 }}>
            {p.dept}
          </div>
          <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.04em" }}>{p.code} · {p.year}</div>
        </div>
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: INK, lineHeight: 1.3, marginBottom: 10 }}>
        {p.title}
      </h3>

      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUTED, marginBottom: 0 }}>
        {p.desc}
      </p>
    </div>
  );
}
