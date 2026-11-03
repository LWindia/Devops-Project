import { navLinks } from "../../content/navigation";
import { OPEN_LEAD_FORM, registerLinkProps, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../../content/links";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              src="/brand/lw-logo.png"
              alt="LinuxWorld"
              className={styles.logo}
              width={556}
              height={308}
              loading="lazy"
            />
            <p className={styles.tagline}>
              <strong>DevOps Project Series</strong>A hands-on engineering program by LinuxWorld.
            </p>
          </div>

          <nav className={styles.links} aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.contact}>
            <a {...registerLinkProps} className={styles.register}>
              Register Now →
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.wa}>
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <button type="button" className={styles.callback} onClick={() => window.dispatchEvent(new Event(OPEN_LEAD_FORM))}>
              Request a callback
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} LinuxWorld. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
