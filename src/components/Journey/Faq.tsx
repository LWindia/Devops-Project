import { useRef, useState } from "react";
import { faqItems } from "../../content/roadmap";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./Faq.module.css";

export function Faq() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  useScrollReveal(ref, { selector: `.${"reveal"}`, y: 18, stagger: 0.05, start: "top 85%" });

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className="eyebrow">FAQ</span>
            <h2 className={styles.title}>Questions, answered before you ask twice.</h2>
            <p className="lead">
              What people ask before starting the series — scope, tooling, and how hands-on it
              really is.
            </p>
          </div>

          <div ref={ref} className={styles.list}>
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className={`${styles.faqItem} reveal`}>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className={styles.questionIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={`${styles.plus} ${isOpen ? styles.plusOpen : ""}`} aria-hidden="true" />
                  </button>
                  <div id={`faq-panel-${index}`} className={styles.answerPanel} data-open={isOpen}>
                    <p className={styles.answerInner}>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
