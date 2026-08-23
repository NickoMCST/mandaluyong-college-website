import { useEffect, useMemo, useRef, useState } from "react";
import {
  BASE, LOGO_URL, BLUE, BLUE_DARK, BLUE_DEEP, CREAM, CREAM_DARK, INK, MUTED, WHITE,
  HERO_SLIDES, MOSAIC, NEWS, PROGRAMS, EVENTS, CAMPUS_GALLERY, PAGE_HERO, ABOUT_CAMPUS_PHOTO,
} from "../data";
import { useImageOverrides } from "../lib/imageOverrides";

// ---------------------------------------------------------------------------
// This page is intentionally NOT linked from the site nav, NOT in the
// sitemap, and disallowed in robots.txt — it's a private tool, not a page
// visitors are meant to find. Two separate gates protect it:
//   1. A short demo password (front-door, keeps casual visitors out).
//   2. Your own GitHub Personal Access Token, entered here and kept only in
//      this browser tab's sessionStorage — never committed anywhere. This
//      token is the *real* authority: only someone holding it can actually
//      publish changes, regardless of whether they find this URL.
// Publishing writes public/image-config.json (and any uploaded photos) to
// your GitHub repo, which triggers your existing deploy.yml workflow and
// republishes the live site for every visitor, typically within 1-3 minutes.
// ---------------------------------------------------------------------------

const DEMO_PASSWORD = "mcst-admin-2026";
const SESSION_AUTH_KEY = "mcc-admin-authed";
const SESSION_TOKEN_KEY = "mcc-admin-gh-token";
const LOCAL_REPO_KEY = "mcc-admin-gh-repo-config";
const CONFIG_REPO_PATH = "public/image-config.json";

// Caption/label overrides live in the same JSON file as image overrides,
// under this suffixed key — see src/lib/imageOverrides.tsx.
const LABEL_SUFFIX = "__label";

// Slots whose caption/name is not shown anywhere on the site (page banners,
// branding) don't get a label field — there's nothing on the page for the
// text to change.
type Slot = { key: string; label: string; group: string; default: string; editableLabel?: boolean };

function useSlots(): Slot[] {
  return useMemo(() => {
    const slots: Slot[] = [
      { key: "branding.logo", label: "Site logo / seal", group: "Branding", default: LOGO_URL },
      { key: "shared.campusPhoto", label: "Campus photo (Home + About)", group: "Branding", default: ABOUT_CAMPUS_PHOTO },
      ...HERO_SLIDES.map((s, i) => ({
        key: `home.hero.${i}`, group: "Homepage Hero Carousel",
        label: `Slide ${i + 1} — "${s.title} ${s.titleItalic}"`, default: s.img,
      })),
      ...MOSAIC.map((m, i) => ({
        key: `home.mosaic.${i}`, group: "Homepage Mosaic", label: `Mosaic tile — ${m.label}`, default: m.src, editableLabel: true,
      })),
      ...NEWS.map((n, i) => ({
        key: `home.news.${i}`, group: "Homepage News", label: `News — ${n.title}`, default: n.img, editableLabel: true,
      })),
      { key: "pageHero.about", label: "About page banner", group: "Page Banners", default: PAGE_HERO.about },
      { key: "pageHero.programs", label: "Programs page banner", group: "Page Banners", default: PAGE_HERO.programs },
      { key: "pageHero.campus", label: "Campus Life page banner", group: "Page Banners", default: PAGE_HERO.campus },
      { key: "pageHero.events", label: "Events page banner", group: "Page Banners", default: PAGE_HERO.events },
      ...PROGRAMS.map(p => ({
        key: `program.${p.code}`, group: "Program Logos", label: `${p.code} — ${p.title}`, default: p.img,
      })),
      ...EVENTS.map((e, i) => ({
        key: `event.${i}`, group: "Events", label: `Event — ${e.title}`, default: e.img, editableLabel: true,
      })),
      ...CAMPUS_GALLERY.map((g, i) => ({
        key: `campus.gallery.${i}`, group: "Campus Life Gallery", label: `Gallery — ${g.label}`, default: g.src, editableLabel: true,
      })),
    ];
    return slots;
  }, []);
}

export default function Admin() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = "Admin — Photo Manager";
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_AUTH_KEY) === "1");

  if (!authed) return <PasswordGate onAuthed={() => setAuthed(true)} />;
  return <Dashboard />;
}

function PasswordGate({ onAuthed }: { onAuthed: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === DEMO_PASSWORD) {
      sessionStorage.setItem(SESSION_AUTH_KEY, "1");
      onAuthed();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BLUE_DEEP, padding: 24 }}>
      <form onSubmit={submit} style={{ background: WHITE, borderRadius: 6, padding: "40px 36px", width: "100%", maxWidth: 380, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
        <img src={LOGO_URL} alt="" style={{ width: 44, height: 44, objectFit: "contain", marginBottom: 18 }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: INK, marginBottom: 6 }}>Admin sign-in</h1>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 22 }}>
          Private photo-management tool. Not linked from the site and not indexed by search engines.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={e => { setValue(e.target.value); setError(false); }}
          placeholder="Password"
          style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: `1px solid ${error ? "#dc2626" : "rgba(10,22,40,0.2)"}`, borderRadius: 4, marginBottom: 10, boxSizing: "border-box" }}
        />
        {error && <p style={{ color: "#dc2626", fontSize: 12.5, marginBottom: 10 }}>Incorrect password.</p>}
        <button type="submit" style={{ width: "100%", padding: "12px 14px", background: BLUE, color: WHITE, border: "none", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: "0.03em", cursor: "pointer" }}>
          Continue
        </button>
      </form>
    </div>
  );
}

type RepoConfig = { owner: string; repo: string; branch: string };

function loadRepoConfig(): RepoConfig {
  try {
    const raw = localStorage.getItem(LOCAL_REPO_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { owner: "", repo: "", branch: "main" };
}

function Dashboard() {
  const slots = useSlots();
  const { images: published, loaded, reload } = useImageOverrides();

  const [draft, setDraft] = useState<Record<string, string>>({});
  const [draftLabels, setDraftLabels] = useState<Record<string, string>>({});
  const [repoConfig, setRepoConfig] = useState<RepoConfig>(loadRepoConfig());
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_TOKEN_KEY) || "");
  const [status, setStatus] = useState<{ kind: "idle" | "working" | "success" | "error"; message: string }>({ kind: "idle", message: "" });
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    localStorage.setItem(LOCAL_REPO_KEY, JSON.stringify(repoConfig));
  }, [repoConfig]);

  useEffect(() => {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }, [token]);

  const groups = useMemo(() => {
    const order: string[] = [];
    const map: Record<string, Slot[]> = {};
    for (const s of slots) {
      if (!map[s.group]) { map[s.group] = []; order.push(s.group); }
      map[s.group].push(s);
    }
    return order.map(g => ({ group: g, slots: map[g] }));
  }, [slots]);

  const currentValue = (slot: Slot) => draft[slot.key] ?? published[slot.key] ?? slot.default;
  const isDirty = (slot: Slot) => slot.key in draft && draft[slot.key] !== (published[slot.key] || slot.default);
  const setDraftValue = (key: string, url: string) => setDraft(prev => ({ ...prev, [key]: url }));
  const resetSlot = (slot: Slot) => setDraft(prev => { const n = { ...prev }; delete n[slot.key]; return n; });

  // Caption/name editing — mirrors the image draft/publish flow above, but
  // stores under `${key}__label` and only applies to slots with a caption
  // actually rendered somewhere on the site (editableLabel: true).
  const publishedLabel = (slot: Slot) => published[`${slot.key}${LABEL_SUFFIX}`] || slot.label;
  const currentLabelValue = (slot: Slot) => draftLabels[slot.key] ?? publishedLabel(slot);
  const isLabelDirty = (slot: Slot) => slot.key in draftLabels && draftLabels[slot.key] !== publishedLabel(slot);
  const setDraftLabel = (key: string, value: string) => setDraftLabels(prev => ({ ...prev, [key]: value }));
  const resetLabel = (slot: Slot) => setDraftLabels(prev => { const n = { ...prev }; delete n[slot.key]; return n; });

  const dirtyCount = slots.filter(s => isDirty(s) || isLabelDirty(s)).length;

  const resetAllDraft = () => { setDraft({}); setDraftLabels({}); };

  const handleFile = (slot: Slot, file: File) => {
    const reader = new FileReader();
    reader.onload = () => setDraftValue(slot.key, String(reader.result));
    reader.readAsDataURL(file);
  };

  async function ghRequest(path: string, init: RequestInit = {}) {
    const res = await fetch(`https://api.github.com/repos/${repoConfig.owner}/${repoConfig.repo}/${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init.headers || {}),
      },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `GitHub API error (${res.status})`);
    }
    return res.json();
  }

  function slugFromKey(key: string) {
    return key.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  }

  function extFromDataUrl(dataUrl: string) {
    const m = /^data:image\/([a-zA-Z0-9+.-]+);base64,/.exec(dataUrl);
    const type = m ? m[1] : "png";
    return type === "jpeg" ? "jpg" : type.split("+")[0];
  }

  async function publish() {
    if (!repoConfig.owner || !repoConfig.repo) {
      setStatus({ kind: "error", message: "Enter your GitHub repo owner and name first." });
      return;
    }
    if (!token) {
      setStatus({ kind: "error", message: "Enter your GitHub token first." });
      return;
    }
    setStatus({ kind: "working", message: "Publishing…" });
    try {
      const finalMap: Record<string, string> = { ...published };

      // Upload any locally-picked files as real files in the repo, and
      // resolve every dirty slot to its final published URL.
      for (const slot of slots) {
        if (!(slot.key in draft)) continue;
        const value = draft[slot.key];
        if (value === "") { delete finalMap[slot.key]; continue; }
        if (value.startsWith("data:")) {
          setStatus({ kind: "working", message: `Uploading photo for "${slot.label}"…` });
          const base64 = value.split(",")[1];
          const ext = extFromDataUrl(value);
          const path = `public/images/uploads/${slugFromKey(slot.key)}-${Date.now()}.${ext}`;
          await ghRequest(`contents/${path}`, {
            method: "PUT",
            body: JSON.stringify({
              message: `Admin: upload photo for ${slot.label}`,
              content: base64,
              branch: repoConfig.branch,
            }),
          });
          finalMap[slot.key] = `${import.meta.env.BASE_URL}images/uploads/${path.split("/").pop()}`;
        } else {
          finalMap[slot.key] = value;
        }
      }

      // Resolve every dirty caption/label the same way — plain text, no
      // upload step needed.
      for (const slot of slots) {
        if (!(slot.key in draftLabels)) continue;
        const value = draftLabels[slot.key].trim();
        const labelKey = `${slot.key}${LABEL_SUFFIX}`;
        if (value === "" || value === slot.label) { delete finalMap[labelKey]; continue; }
        finalMap[labelKey] = value;
      }

      setStatus({ kind: "working", message: "Saving image-config.json…" });
      let sha: string | undefined;
      try {
        const existing = await ghRequest(`contents/${CONFIG_REPO_PATH}?ref=${repoConfig.branch}`);
        sha = existing.sha;
      } catch {
        // File may not exist yet on first publish — that's fine, we'll create it.
      }
      const jsonContent = JSON.stringify(finalMap, null, 2);
      const base64Json = btoa(unescape(encodeURIComponent(jsonContent)));
      await ghRequest(`contents/${CONFIG_REPO_PATH}`, {
        method: "PUT",
        body: JSON.stringify({
          message: "Admin: update site photos",
          content: base64Json,
          branch: repoConfig.branch,
          ...(sha ? { sha } : {}),
        }),
      });

      resetAllDraft();
      setStatus({
        kind: "success",
        message: `Published! GitHub Actions is rebuilding the site now — changes will be live for everyone in about 1-3 minutes.`,
      });
      setTimeout(reload, 4000);
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: "system-ui, sans-serif" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: BLUE_DEEP, color: WHITE, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_URL} alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Photo Manager</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>Private admin tool — not visible to site visitors</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href={BASE} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12.5, textDecoration: "underline" }}>Open live site</a>
          <button onClick={() => { sessionStorage.removeItem(SESSION_AUTH_KEY); location.reload(); }}
            style={{ background: "rgba(255,255,255,0.1)", color: WHITE, border: "none", borderRadius: 4, padding: "8px 14px", fontSize: 12.5, cursor: "pointer" }}>
            Log out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px 100px" }}>
        {/* GitHub connection */}
        <section style={{ background: WHITE, border: "1px solid rgba(10,22,40,0.1)", borderRadius: 6, padding: 22, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Publish destination</h2>
          <p style={{ fontSize: 12.5, color: MUTED, marginBottom: 16, lineHeight: 1.6 }}>
            Changes publish by committing to your GitHub repo, which triggers your existing deploy workflow.
            Your token is kept only in this browser tab (cleared when the tab closes) — it's never saved to the repo.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 10, marginBottom: 10 }}>
            <input placeholder="GitHub username / org (owner)" value={repoConfig.owner}
              onChange={e => setRepoConfig(c => ({ ...c, owner: e.target.value.trim() }))}
              style={inputStyle} />
            <input placeholder="Repository name" value={repoConfig.repo}
              onChange={e => setRepoConfig(c => ({ ...c, repo: e.target.value.trim() }))}
              style={inputStyle} />
            <input placeholder="branch" value={repoConfig.branch}
              onChange={e => setRepoConfig(c => ({ ...c, branch: e.target.value.trim() || "main" }))}
              style={inputStyle} />
          </div>
          <input type="password" placeholder="GitHub Personal Access Token (repo contents: read & write)" value={token}
            onChange={e => setToken(e.target.value.trim())} style={inputStyle} />
          <p style={{ fontSize: 11.5, color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
            Use a <strong>fine-grained token</strong> scoped only to this one repository with "Contents: Read and write" permission. Revoke it on GitHub any time from Settings → Developer settings.
          </p>
        </section>

        {/* Status banner */}
        {status.kind !== "idle" && (
          <div style={{
            padding: "12px 16px", borderRadius: 6, marginBottom: 20, fontSize: 13, lineHeight: 1.6,
            background: status.kind === "error" ? "#fee2e2" : status.kind === "success" ? "#dcfce7" : "#e0e7ff",
            color: status.kind === "error" ? "#991b1b" : status.kind === "success" ? "#166534" : "#3730a3",
          }}>
            {status.message}
          </div>
        )}

        {!loaded && <p style={{ color: MUTED, fontSize: 13 }}>Loading current published photos…</p>}

        {/* Groups */}
        {groups.map(({ group, slots: groupSlots }) => {
          const isOpen = openGroup === null ? true : openGroup === group;
          return (
            <section key={group} style={{ marginBottom: 18 }}>
              <button onClick={() => setOpenGroup(isOpen && openGroup === group ? null : group)}
                style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", background: CREAM_DARK, border: "none", borderRadius: 6, padding: "12px 16px", cursor: "pointer", marginBottom: isOpen ? 10 : 0 }}>
                <span style={{ fontWeight: 700, fontSize: 13.5, color: INK }}>{group}</span>
                <span style={{ fontSize: 11.5, color: MUTED }}>{groupSlots.length} photo{groupSlots.length > 1 ? "s" : ""} {isOpen ? "▾" : "▸"}</span>
              </button>
              {isOpen && (
                <div style={{ display: "grid", gap: 10 }}>
                  {groupSlots.map(slot => {
                    const value = currentValue(slot);
                    const dirty = isDirty(slot);
                    const labelDirty = isLabelDirty(slot);
                    return (
                      <div key={slot.key} style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 14, alignItems: "start", background: WHITE, border: `1px solid ${dirty || labelDirty ? BLUE : "rgba(10,22,40,0.08)"}`, borderRadius: 6, padding: 12 }}>
                        <img src={value} alt="" style={{ width: 72, height: 54, objectFit: "cover", borderRadius: 4, background: CREAM_DARK }}
                          onError={e => { (e.target as HTMLImageElement).style.opacity = "0.25"; }} />
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600, color: INK, marginBottom: 6 }}>
                            {slot.label} {(dirty || labelDirty) && <span style={{ color: BLUE, fontWeight: 700 }}>· unpublished</span>}
                          </div>
                          <input
                            value={value.startsWith("data:") ? "(newly uploaded file)" : value}
                            onChange={e => setDraftValue(slot.key, e.target.value)}
                            readOnly={value.startsWith("data:")}
                            placeholder="Paste an image URL"
                            style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: "1px solid rgba(10,22,40,0.15)", borderRadius: 4, boxSizing: "border-box", marginBottom: slot.editableLabel ? 6 : 0 }}
                          />
                          {slot.editableLabel && (
                            <>
                              <div style={{ fontSize: 10.5, color: MUTED, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Caption / name shown on site</div>
                              <input
                                value={currentLabelValue(slot)}
                                onChange={e => setDraftLabel(slot.key, e.target.value)}
                                placeholder="Caption shown on the site"
                                style={{ width: "100%", padding: "8px 10px", fontSize: 12, border: `1px solid ${labelDirty ? BLUE : "rgba(10,22,40,0.15)"}`, borderRadius: 4, boxSizing: "border-box" }}
                              />
                            </>
                          )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <input type="file" accept="image/*" ref={el => { fileInputs.current[slot.key] = el; }}
                            style={{ display: "none" }}
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(slot, f); }} />
                          <button onClick={() => fileInputs.current[slot.key]?.click()} style={smallBtn}>Upload</button>
                          <button onClick={() => { resetSlot(slot); resetLabel(slot); }} disabled={!dirty && !labelDirty} style={{ ...smallBtn, opacity: (dirty || labelDirty) ? 1 : 0.4, cursor: (dirty || labelDirty) ? "pointer" : "default" }}>Undo</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Publish bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: WHITE, borderTop: "1px solid rgba(10,22,40,0.1)", padding: "14px 24px", display: "flex", justifyContent: "center", gap: 12, boxShadow: "0 -10px 30px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 980, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: MUTED }}>{dirtyCount === 0 ? "No unpublished changes" : `${dirtyCount} change${dirtyCount > 1 ? "s" : ""} ready to publish`}</span>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={resetAllDraft} disabled={dirtyCount === 0} style={{ ...smallBtn, padding: "10px 16px", opacity: dirtyCount === 0 ? 0.4 : 1 }}>Discard all</button>
            <button onClick={publish} disabled={dirtyCount === 0 || status.kind === "working"}
              style={{ padding: "10px 22px", background: dirtyCount === 0 ? "rgba(10,22,40,0.2)" : BLUE_DARK, color: WHITE, border: "none", borderRadius: 4, fontWeight: 700, fontSize: 13, cursor: dirtyCount === 0 ? "default" : "pointer" }}>
              {status.kind === "working" ? "Publishing…" : "Publish to live site"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: "10px 12px", fontSize: 13, border: "1px solid rgba(10,22,40,0.15)", borderRadius: 4, boxSizing: "border-box", width: "100%" };
const smallBtn: React.CSSProperties = { padding: "6px 12px", fontSize: 11.5, background: CREAM_DARK, border: "1px solid rgba(10,22,40,0.12)", borderRadius: 4, cursor: "pointer", color: INK };
