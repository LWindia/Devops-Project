/**
 * Thin wrapper around Google Analytics 4 (gtag.js is loaded in index.html).
 * Safe to call when GA is blocked or not loaded.
 */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params?: Record<string, unknown>) {
  try {
    (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

/** Track clicks on Register (Razorpay) and WhatsApp links anywhere on the page. */
export function installLinkTracking() {
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const section = a.closest("section[id], header, footer")?.getAttribute("id") ?? a.closest("footer, header")?.tagName.toLowerCase();
      const label = (a.innerText || a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
      if (a.href.includes("rzp.io")) track("register_click", { link_text: label, section });
      else if (a.href.includes("wa.me")) track("whatsapp_click", { link_text: label, section });
    },
    { capture: true }
  );
}
