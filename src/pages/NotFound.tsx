import { Link } from "react-router";
import { LOGO_URL, BLUE, BLUE_DEEP, BLUE_MID, WHITE } from "../data";

export default function NotFound() {
  return (
    <section style={{ minHeight: "100vh", paddingTop: 102, background: BLUE_DEEP, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ padding: 32 }}>
        <img src={LOGO_URL} alt="MCST seal" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 28, filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))" }} />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 96, fontWeight: 700, color: BLUE_MID, lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: WHITE, margin: "12px 0 16px" }}>Page Not Found</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 32, maxWidth: 380 }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" style={{ padding: "13px 30px", background: BLUE, color: WHITE, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.background = BLUE_MID)}
          onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
