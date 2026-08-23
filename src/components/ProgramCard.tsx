import { BLUE, INK, MUTED } from "../data";
import { useImg } from "../lib/imageOverrides";

type Program = { code: string; title: string; dept: string; img: string };

// Catalog-row treatment: reads like an entry in a printed college prospectus
// rather than a dashboard card. The code is set large and in outline as a
// watermark-style monogram, since these letters (BACOM, BSIS...) are how
// students actually refer to the programs day-to-day.
export default function ProgramCard({ p }: { p: Program }) {
  const img = useImg();
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 18,
        padding: "26px 4px",
        borderTop: "1px solid rgba(10,22,40,0.14)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      className="prog-row"
      onMouseEnter={e => {
        e.currentTarget.querySelector(".prog-title")!.setAttribute("style",
          "font-family:'Playfair Display',serif;font-size:19px;font-weight:600;color:#1565c0;line-height:1.3;margin-bottom:6px;transition:color .2s;transform:translateX(6px);transition-property:color,transform;transition-duration:.25s");
        (e.currentTarget.querySelector(".prog-code") as HTMLElement).style.color = "rgba(21,101,192,0.16)";
        (e.currentTarget.querySelector(".prog-logo") as HTMLElement).style.opacity = "1";
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector(".prog-title")!.setAttribute("style",
          "font-family:'Playfair Display',serif;font-size:19px;font-weight:600;color:#111827;line-height:1.3;margin-bottom:6px;transform:translateX(0);transition-property:color,transform;transition-duration:.25s");
        (e.currentTarget.querySelector(".prog-code") as HTMLElement).style.color = "rgba(10,22,40,0.06)";
        (e.currentTarget.querySelector(".prog-logo") as HTMLElement).style.opacity = "0";
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, marginBottom: 8 }}>
          {p.dept}
        </div>
        <h3 className="prog-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: INK, lineHeight: 1.3, marginBottom: 6, transitionProperty: "color, transform", transitionDuration: "0.25s" }}>
          {p.title}
        </h3>
        <div style={{ fontSize: 11.5, color: MUTED, letterSpacing: "0.04em" }}>{p.code}</div>
      </div>

      {/* watermark code, sits behind the title, becomes near-invisible on hover to make way for the logo */}
      <span
        className="prog-code"
        aria-hidden
        style={{
          position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
          fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 54,
          letterSpacing: "0.01em", color: "rgba(10,22,40,0.06)", pointerEvents: "none",
          transition: "color 0.25s", whiteSpace: "nowrap",
        }}
      >
        {p.code}
      </span>

      <img
        className="prog-logo"
        src={img(`program.${p.code}`, p.img)}
        alt={`${p.code} logo`}
        loading="lazy"
        decoding="async"
        onError={e => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        style={{
          position: "relative", zIndex: 1, width: 44, height: 44, objectFit: "contain",
          mixBlendMode: "multiply", opacity: 0, transition: "opacity 0.25s",
        }}
      />
    </div>
  );
}
