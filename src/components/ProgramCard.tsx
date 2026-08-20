import { BLUE, BLUE_MID, INK, MUTED, WHITE } from "../data";

type Program = { code: string; title: string; dept: string; img: string };

/**
 * Program logos are stored as JPGs with a white background on the server.
 * The card sits on a light surface and the logo uses `mixBlendMode: multiply`,
 * so the white background drops out and only the mark itself remains.
 */
export default function ProgramCard({ p }: { p: Program }) {
  return (
    <div style={{
      background: WHITE, borderRadius: 3, padding: "30px 26px",
      border: "1px solid rgba(10,22,40,0.07)", position: "relative", overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 1px 2px rgba(10,22,40,0.04)",
      height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(10,22,40,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(10,22,40,0.04)"; }}>
      <img src={p.img} alt={`${p.code} logo`} loading="lazy" decoding="async" style={{
        width: 58, height: 58, objectFit: "contain", display: "block", marginBottom: 18,
        mixBlendMode: "multiply",
      }}
      onError={e => { (e.target as HTMLImageElement).style.visibility = "hidden"; }} />
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, marginBottom: 8 }}>
        {p.dept}
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: INK, lineHeight: 1.3, marginBottom: 6 }}>
        {p.title}
      </h3>
      <div style={{ fontSize: 12, color: MUTED, letterSpacing: "0.04em" }}>{p.code}</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: "0%", background: BLUE_MID, transition: "width 0.3s" }} className="prog-bar" />
    </div>
  );
}
