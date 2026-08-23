import { useState } from "react";
import { LOGO_URL, BLUE, BLUE_DEEP, BLUE_MID, WHITE, PROGRAMS } from "../data";
import { useImg } from "../lib/imageOverrides";

export default function Contact() {
  const img = useImg();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ paddingTop: 102, background: BLUE_DEEP }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="contact-grid">
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Admissions</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: WHITE, lineHeight: 1.12, marginBottom: 24 }}>
            Start Your<br /><em style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)" }}>Application</em>
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: 44 }}>
            Prospective students, parents, and partner institutions are welcome to reach out. Our admissions office will guide you through every step of the process.
          </p>

          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 32 }}>
            <img src={img("branding.logo", LOGO_URL)} alt="MCST seal" style={{ width: 68, height: 68, objectFit: "contain", flexShrink: 0, filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))" }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: WHITE, marginBottom: 4 }}>
                Mandaluyong College of Science &amp; Technology
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Mandaluyong City, Metro Manila<br />Philippines
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Website", val: "mandaluyongcollege.edu.ph" },
              { label: "Facebook", val: "@MandaluyongCST" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.15)" }} />
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginRight: 10 }}>{c.label}</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{c.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {submitted ? (
          <div role="status" aria-live="polite" style={{
            background: "rgba(21,101,192,0.12)", border: "1px solid rgba(21,101,192,0.3)",
            borderRadius: 3, padding: "32px 28px",
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: WHITE, marginBottom: 10 }}>
              Thanks for trying the demo form
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 20 }}>
              This is a portfolio concept — there's no backend, so nothing was actually sent or delivered anywhere.
              In a real deployment, this form would connect to an admissions inbox or CRM.
            </p>
            <button type="button" onClick={() => setSubmitted(false)} style={{
              padding: "10px 22px", background: "transparent", color: BLUE_MID, border: `1px solid ${BLUE_MID}`,
              fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: 1, cursor: "pointer",
            }}>
              Try Again
            </button>
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            aria-label="Demo admissions inquiry form — not connected to a real backend"
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
              Demo form — part of an unofficial portfolio project. Submissions are not sent anywhere.
            </p>

            {[
              { id: "contact-name",  label: "Full Name",     type: "text",  placeholder: "Juan dela Cruz" },
              { id: "contact-email", label: "Email Address", type: "email", placeholder: "juan@email.com" },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
                <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required style={fieldStyle}
                  onFocus={e => (e.target.style.borderBottomColor = BLUE_MID)}
                  onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.15)")} />
              </div>
            ))}

            <div>
              <label htmlFor="contact-program" style={labelStyle}>Program of Interest</label>
              <select id="contact-program" name="program" style={{ ...fieldStyle, color: "rgba(255,255,255,0.7)" }}>
                <option value="" style={{ background: BLUE_DEEP }}>Select a program…</option>
                {PROGRAMS.map(p => <option key={p.code} value={p.code} style={{ background: BLUE_DEEP }}>{p.title}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" style={labelStyle}>Message</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Your inquiry…" style={{ ...fieldStyle, resize: "none" }}
                onFocus={e => (e.target.style.borderBottomColor = BLUE_MID)}
                onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.15)")} />
            </div>

            <button type="submit" style={{
              padding: "14px 32px", background: BLUE, color: WHITE, border: "none",
              fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
              borderRadius: 1, cursor: "pointer", alignSelf: "flex-start",
              transition: "background 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = BLUE_MID; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = "none"; }}>
              Send Inquiry (Demo)
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
  textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8,
};
const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "12px 0", background: "transparent", border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.15)", color: WHITE, fontSize: 15,
  outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
};
