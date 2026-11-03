import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

declare const process: { env: Record<string, string | undefined> };

/** Public production URL of the site. */
const PRODUCTION_URL = "https://devopsprojects.hash13.com";

/**
 * The site's public URL, used for canonical links, social previews, structured
 * data and the sitemap. Resolved at build time:
 *   1. SITE_URL env var, if set (overrides everything)
 *   2. PRODUCTION_URL above
 *   3. Vercel's production domain (VERCEL_PROJECT_PRODUCTION_URL)
 * If none is available, tags that need an absolute URL are left out.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  if (PRODUCTION_URL) return PRODUCTION_URL.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "";
}

function seo(): Plugin {
  const siteUrl = resolveSiteUrl();
  return {
    name: "site-seo",
    transformIndexHtml(html) {
      if (siteUrl) return html.split("%SITE_URL%").join(siteUrl);
      // No known domain: drop tags that require an absolute URL, keep relative image paths.
      return html
        .replace(/^\s*<link rel="canonical"[^>]*>\n/m, "")
        .replace(/^\s*<meta property="og:url"[^>]*>\n/m, "")
        .split("%SITE_URL%").join("");
    },
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /", ...(siteUrl ? ["", `Sitemap: ${siteUrl}/sitemap.xml`] : []), ""];
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots.join("\n") });
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source:
            `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            `  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n` +
            `</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
});
