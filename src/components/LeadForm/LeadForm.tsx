import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { LEAD_FORM_ENDPOINT, OPEN_LEAD_FORM, registerLinkProps, WHATSAPP_URL } from "../../content/links";
import { track } from "../../lib/analytics";
import styles from "./LeadForm.module.css";

/** Auto-open after this delay, or once the visitor scrolls this far — whichever comes first. */
const AUTO_OPEN_MS = 15000;
const AUTO_OPEN_SCROLL = 0.4;
/** After closing, don't auto-open again for this long. Submitting stops it for good. */
const SNOOZE_DAYS = 3;
const STORE_KEY = "lw-lead-popup";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "whatsapp" | "email", string>>;

const readStore = (): { submitted?: boolean; snoozeUntil?: number } => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
};
const writeStore = (v: { submitted?: boolean; snoozeUntil?: number }) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(v));
  } catch {
    /* storage unavailable — popup simply may show again */
  }
};

const digits = (s: string) => s.replace(/\D/g, "");

function validate(name: string, code: string, phone: string, email: string): Errors {
  const e: Errors = {};
  if (name.trim().length < 2) e.name = "Please enter your name.";
  const cc = digits(code);
  const num = digits(phone);
  if (!cc || cc.length > 4) e.whatsapp = "Enter a valid country code.";
  else if (num.length < 6 || num.length > 14) e.whatsapp = "Enter a valid WhatsApp number.";
  else if (cc === "91" && num.length !== 10) e.whatsapp = "Indian numbers have 10 digits.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Enter a valid email address.";
  return e;
}

export function LeadForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const autoShownRef = useRef(false);

  const show = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    track("lead_form_open");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    const store = readStore();
    if (!store.submitted) writeStore({ ...store, snoozeUntil: Date.now() + SNOOZE_DAYS * 864e5 });
    lastFocusRef.current?.focus?.();
  }, []);

  // Manual trigger from anywhere on the site.
  useEffect(() => {
    const onOpen = () => show();
    window.addEventListener(OPEN_LEAD_FORM, onOpen);
    return () => window.removeEventListener(OPEN_LEAD_FORM, onOpen);
  }, [show]);

  // Auto-open once (unless already submitted or recently dismissed).
  useEffect(() => {
    const store = readStore();
    if (store.submitted || (store.snoozeUntil && store.snoozeUntil > Date.now())) return;

    const trigger = () => {
      if (autoShownRef.current) return;
      autoShownRef.current = true;
      cleanup();
      show();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= AUTO_OPEN_SCROLL) trigger();
    };
    const timer = window.setTimeout(trigger, AUTO_OPEN_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, [show]);

  // While open: lock page scroll, focus the first field, Esc closes, Tab stays inside.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const honeypot = (new FormData(ev.currentTarget).get("company") as string) || "";
    const errs = validate(name, code, phone, email);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (!LEAD_FORM_ENDPOINT) {
      console.warn("[LeadForm] LEAD_FORM_ENDPOINT is empty — set it in src/content/links.ts");
      setStatus("error");
      return;
    }

    setStatus("sending");
    const body = new URLSearchParams({
      name: name.trim(),
      whatsapp: `+${digits(code)} ${digits(phone)}`,
      email: email.trim(),
      page: window.location.href,
      company: honeypot,
    });

    try {
      // Apps Script web apps don't send CORS headers, so post as a "simple"
      // request and treat a completed request as success.
      await fetch(LEAD_FORM_ENDPOINT, { method: "POST", mode: "no-cors", body });
      setStatus("done");
      writeStore({ submitted: true });
      track("generate_lead", { method: "popup_form" });
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  const firstName = name.trim().split(/\s+/)[0];

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        aria-describedby="lead-desc"
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {status === "done" ? (
          <div className={styles.success}>
            <span className={styles.check} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="lead-title" className={styles.title}>
              Thanks{firstName ? `, ${firstName}` : ""}!
            </h2>
            <p id="lead-desc" className={styles.desc}>
              We've got your details. Our team will reach out to you on WhatsApp shortly.
            </p>
            <div className={styles.successActions}>
              <a {...registerLinkProps} className="btn btn-primary">
                Register Now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <img src="/brand/lw-mark.png" alt="" className={styles.mark} width={326} height={193} />
              <span className={styles.kicker}>DevOps Project Series</span>
            </div>
            <h2 id="lead-title" className={styles.title}>
              Get the full curriculum &amp; batch details
            </h2>
            <p id="lead-desc" className={styles.desc}>
              Leave your details and our team will send everything to you on WhatsApp.
            </p>

            <form className={styles.form} onSubmit={onSubmit} noValidate>
              {/* Honeypot: hidden from people, bots fill it in */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />

              <label className={styles.field}>
                <span className={styles.label}>Full name</span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "lead-err-name" : undefined}
                  maxLength={100}
                />
                {errors.name && (
                  <span id="lead-err-name" className={styles.error}>
                    {errors.name}
                  </span>
                )}
              </label>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lead-phone">
                  WhatsApp number
                </label>
                <div className={styles.phoneRow} data-invalid={!!errors.whatsapp}>
                  <input
                    type="tel"
                    className={styles.code}
                    aria-label="Country code"
                    autoComplete="tel-country-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/[^\d+]/g, "").slice(0, 5))}
                    aria-invalid={!!errors.whatsapp}
                  />
                  <input
                    id="lead-phone"
                    type="tel"
                    name="whatsapp"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, "").slice(0, 18))}
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={errors.whatsapp ? "lead-err-wa" : undefined}
                  />
                </div>
                {errors.whatsapp && (
                  <span id="lead-err-wa" className={styles.error}>
                    {errors.whatsapp}
                  </span>
                )}
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "lead-err-email" : undefined}
                  maxLength={150}
                />
                {errors.email && (
                  <span id="lead-err-email" className={styles.error}>
                    {errors.email}
                  </span>
                )}
              </label>

              {status === "error" && (
                <p className={styles.formError} role="alert">
                  Something went wrong sending your details. Please try again, or{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    message us on WhatsApp
                  </a>
                  .
                </p>
              )}

              <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" /> Sending…
                  </>
                ) : (
                  "Send me the details"
                )}
              </button>
              <p className={styles.privacy}>We'll only use this to contact you about the DevOps Project Series.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
