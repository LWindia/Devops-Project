import { useEffect, useState } from "react";
import { navLinks } from "../../content/navigation";
import { registerLinkProps } from "../../content/links";
import styles from "./Nav.module.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = () => setOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.brand} onClick={handleNavigate}>
          <img src="/brand/lw-mark.png" alt="LinuxWorld" className={styles.mark} width={326} height={193} />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.brandText}>
            <span className={styles.brandName}>DevOps Project Series</span>
            <span className={styles.brandBy}>by LinuxWorld</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? styles.active : undefined}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a {...registerLinkProps} className={`btn btn-primary ${styles.cta}`}>
          <span className={styles.ctaFull}>Register Now</span>
          <span className={styles.ctaShort}>Register</span>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          className={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.mobilePanel} data-open={open}>
        <nav className={styles.mobileMenu} aria-label="Mobile">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? styles.active : undefined}
                aria-current={isActive ? "true" : undefined}
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            );
          })}
          <a {...registerLinkProps} className="btn btn-primary" onClick={handleNavigate}>
            Register Now
          </a>
        </nav>
      </div>

      <button
        type="button"
        className={styles.backdrop}
        data-open={open}
        aria-hidden="true"
        tabIndex={-1}
        onClick={handleNavigate}
      />
    </header>
  );
}
