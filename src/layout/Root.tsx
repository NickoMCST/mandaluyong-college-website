import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { NAV, MENU, UTILITY, LOGO_URL, BLUE, BLUE_DARK, BLUE_DEEP, BLUE_MID, CREAM, INK, MUTED, WHITE } from "../data";

export default function Root() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMega(null);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const solid = !isHome || scrolled;

  const doSearch = (q: string) => {
    const t = q.toLowerCase();
    if (t.includes("program") || t.includes("course") || t.includes("degree")) navigate("/programs");
    else if (t.includes("event") || t.includes("news")) navigate("/events");
    else if (t.includes("apply") || t.includes("admiss") || t.includes("contact")) navigate("/contact");
    else if (t.includes("campus") || t.includes("life")) navigate("/campus");
    else navigate("/about");
    setSearchOpen(false);
  };

  return (
    <div style={{ background: CREAM, color: INK, minHeight: "100vh", overflowX: "hidden" }}>
      <header
        onMouseLeave={() => setOpenMega(null)}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.3s, box-shadow 0.3s",
          background: (solid || openMega) ? "rgba(10,22,40,0.97)" : "transparent",
          backdropFilter: (solid || openMega) ? "blur(16px)" : "none",
          boxShadow: (solid || openMega) ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}>

        {/* Utility bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: (solid || openMega) ? "rgba(0,0,0,0.2)" : "rgba(10,22,40,0.28)" }} className="utility-bar">
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Unofficial Student Project · by Lenver Nicko V. Andes
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {UTILITY.map(u => (
              <Link key={u.label} to={u.to} style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>{u.label}</Link>
            ))}
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.15)" }} />
            <a href="https://www.facebook.com/MandaluyongCST" target="_blank" rel="noreferrer" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: BLUE_MID, textDecoration: "none" }}>Facebook</a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src={LOGO_URL} alt="MCST seal" style={{ width: 46, height: 46, objectFit: "contain", flexShrink: 0 }} />
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: 12 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: WHITE, letterSpacing: "0.04em", lineHeight: 1.1 }}>Mandaluyong College</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>of Science &amp; Technology</div>
            </div>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desk-nav">
            {MENU.map(m => (
              <div key={m.label} onMouseEnter={() => setOpenMega(m.label)}>
                <Link to={m.to} style={{
                  display: "inline-block", padding: "10px 14px", fontSize: 12.5, fontWeight: 500, letterSpacing: "0.04em",
                  color: openMega === m.label ? WHITE : "rgba(255,255,255,0.78)", textDecoration: "none", transition: "color 0.15s",
                }}>{m.label}</Link>
              </div>
            ))}
            <button onClick={() => setSearchOpen(s => !s)} aria-label="Search" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, marginLeft: 4, color: "rgba(255,255,255,0.8)", display: "flex" }}>
              <SearchIcon />
            </button>
            <Link to="/contact" style={{
              marginLeft: 8, padding: "9px 22px", background: BLUE, color: WHITE, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none", transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = BLUE_DARK)}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>Apply Now</Link>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mob-btn" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "none" }}>
            <div style={{ width: 22, height: 1.5, background: WHITE, margin: "5px 0", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <div style={{ width: 22, height: 1.5, background: WHITE, margin: "5px 0", opacity: menuOpen ? 0 : 1, transition: "opacity 0.15s" }} />
            <div style={{ width: 22, height: 1.5, background: WHITE, margin: "5px 0", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        </div>

        {/* Mega-menu panel */}
        {openMega && (
          <div className="mega-panel" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,22,40,0.99)", animation: "fadeUp 0.25s ease both" }}>
            {MENU.filter(m => m.label === openMega).map(m => (
              <div key={m.label} style={{ maxWidth: 1280, margin: "0 auto", padding: "34px 32px 40px", display: "flex", gap: 64 }}>
                {m.groups.map(g => (
                  <div key={g.title}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE_MID, marginBottom: 18 }}>{g.title}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {g.links.map(l => (
                        <Link key={l.label} to={l.to} style={{ textDecoration: "none", maxWidth: 240 }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: WHITE, marginBottom: 2 }}>{l.label}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{l.sub}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Search drawer */}
        {searchOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,22,40,0.99)", animation: "fadeUp 0.2s ease both" }}>
            <form onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value; doSearch(v); }}
              style={{ maxWidth: 1280, margin: "0 auto", padding: "22px 32px", display: "flex", alignItems: "center", gap: 14 }}>
              <SearchIcon />
              <input name="q" autoFocus placeholder="Search programs, admissions, events…" style={{
                flex: 1, background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)",
                color: WHITE, fontSize: 18, padding: "8px 0", outline: "none", fontFamily: "'Lora', serif",
              }} />
              <button type="submit" style={{ padding: "9px 20px", background: BLUE, color: WHITE, border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, cursor: "pointer" }}>Go</button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: BLUE_DEEP, padding: "8px 20px 24px", maxHeight: "80vh", overflowY: "auto" }}>
            <form onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem("mq") as HTMLInputElement).value; doSearch(v); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 6 }}>
              <SearchIcon />
              <input name="mq" placeholder="Search…" style={{ flex: 1, background: "transparent", border: "none", color: WHITE, fontSize: 15, padding: "6px 0", outline: "none", fontFamily: "'Lora', serif" }} />
              <button type="submit" style={{ padding: "8px 16px", background: BLUE, color: WHITE, border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 1, cursor: "pointer" }}>Go</button>
            </form>
            {NAV.map(n => (
              <NavLink key={n.label} to={n.to} end={n.to === "/"} style={{ display: "block", padding: "13px 0", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 15, fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{n.label}</NavLink>
            ))}
            <Link to="/contact" style={{ display: "block", marginTop: 18, padding: "13px", textAlign: "center", background: BLUE, color: WHITE, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 1, textDecoration: "none" }}>Apply Now</Link>
          </div>
        )}
      </header>

      <main><Outlet /></main>
      <Footer />

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
        style={{
          position: "fixed", bottom: 26, right: 26, zIndex: 90,
          width: 46, height: 46, borderRadius: "50%", border: "none", cursor: "pointer",
          background: BLUE, color: WHITE, boxShadow: "0 8px 24px rgba(10,22,40,0.35)",
          display: scrolled ? "flex" : "none", alignItems: "center", justifyContent: "center",
          transition: "background 0.15s, transform 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = BLUE_MID; e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = "none"; }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(255,255,255,0.8)", flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function Footer() {
  const cols = [
    { title: "Academics", links: [["Programs", "/programs"], ["Colleges", "/programs"], ["Program Finder", "/programs"]] },
    { title: "Admissions", links: [["Apply Now", "/contact"], ["Scholarships", "/contact"], ["Requirements", "/contact"]] },
    { title: "Campus", links: [["Campus Life", "/campus"], ["Events", "/events"], ["Student Portal", "/campus"]] },
    { title: "About", links: [["Our Story", "/about"], ["Values", "/about"], ["Contact", "/contact"]] },
  ] as const;

  return (
    <footer style={{ background: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "56px 32px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(4, 1fr)", gap: 40, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src={LOGO_URL} alt="MCST seal" style={{ width: 46, height: 46, objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: WHITE, lineHeight: 1.1 }}>Mandaluyong College</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>of Science &amp; Technology</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, maxWidth: 300, marginBottom: 18 }}>
              Serving Mandaluyong City through quality, accessible, and values-based education.
            </p>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.9 }}>
              Mandaluyong City, Metro Manila<br />Philippines<br />
              <a href="https://www.mandaluyongcollege.edu.ph" target="_blank" rel="noreferrer" style={{ color: BLUE_MID, textDecoration: "none" }}>mandaluyongcollege.edu.ph</a>
            </p>
          </div>

          {cols.map(c => (
            <div key={c.title}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>{c.title}</p>
              {c.links.map(([label, to]) => (
                <Link key={label} to={to} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 11, transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ background: "rgba(21,101,192,0.1)", border: "1px solid rgba(21,101,192,0.25)", borderRadius: 3, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: BLUE_MID, fontWeight: 700 }}>Disclaimer:</strong> This website is an independent student project and is <strong style={{ color: "rgba(255,255,255,0.75)" }}>not the official website</strong> of Mandaluyong College of Science and Technology. It is not affiliated with, endorsed by, or maintained by the institution.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>A project by <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Lenver Nicko V. Andes</strong> · © 2026 · Unofficial concept redesign</span>
          <div style={{ display: "flex", gap: 18 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Privacy Policy</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
