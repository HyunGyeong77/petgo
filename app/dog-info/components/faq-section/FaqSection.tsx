"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "../../lib/use-scroll-animation";
import { type FaqItem } from "../../dog-info.data";
import styles from "./faq-section.module.scss";

type FaqSectionProps = {
  faqs: FaqItem[];
};

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const listRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.06 });

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="dog-info-faq" className={styles.section}>
      <div className={styles.inner}>
        <div
          className={styles.header}
          ref={headerRef}
          data-animate="hidden"
        >
          <h2 className={styles.title}>자주 묻는 질문</h2>
          <p className={styles.subtitle}>
            초보 보호자들이 가장 많이 묻는 질문들입니다
          </p>
        </div>
        <div className={styles.list} ref={listRef}>
          {faqs.map((faq, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div
                key={index}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                data-animate="hidden"
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <button
                  onClick={() => toggle(index)}
                  className={styles.question}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    width={18}
                    height={18}
                    className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
