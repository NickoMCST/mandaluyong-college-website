import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";

// The live site resolves every editable photo through this file. It is a
// plain static JSON file shipped inside public/ (so it exists at
// `${BASE_URL}image-config.json` for every visitor, not just the admin's own
// browser). The admin dashboard (see src/pages/Admin.tsx) edits this file by
// committing directly to the GitHub repo, which triggers the site's existing
// GitHub Actions build/deploy — so a "Publish" from the dashboard becomes
// visible to everyone once that deploy finishes (usually 1-3 minutes).
const CONFIG_PATH = "image-config.json";

type ImageMap = Record<string, string>;

type Ctx = {
  images: ImageMap;
  loaded: boolean;
  img: (key: string, fallback: string) => string;
  reload: () => void;
};

const ImageOverridesContext = createContext<Ctx | null>(null);

export function ImageOverridesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageMap>({});
  const [loaded, setLoaded] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL;
    // Cache-bust so visitors see a freshly published config quickly rather
    // than a stale cached copy of the JSON file.
    fetch(`${base}${CONFIG_PATH}?v=${Date.now()}`, { cache: "no-store" })
      .then(res => (res.ok ? res.json() : {}))
      .then((data: ImageMap) => {
        if (!cancelled) setImages(data && typeof data === "object" ? data : {});
      })
      .catch(() => {
        if (!cancelled) setImages({});
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const img = useCallback((key: string, fallback: string) => images[key] || fallback, [images]);
  const reload = useCallback(() => setNonce(n => n + 1), []);

  return (
    <ImageOverridesContext.Provider value={{ images, loaded, img, reload }}>
      {children}
    </ImageOverridesContext.Provider>
  );
}

/** Use inside any public page/component to resolve an image's current src. */
export function useImg() {
  const ctx = useContext(ImageOverridesContext);
  if (!ctx) throw new Error("useImg must be used within an ImageOverridesProvider");
  return ctx.img;
}

/** Full context access (used by the admin dashboard to show current published state). */
export function useImageOverrides() {
  const ctx = useContext(ImageOverridesContext);
  if (!ctx) throw new Error("useImageOverrides must be used within an ImageOverridesProvider");
  return ctx;
}
