"use client";

import { useState } from "react";
import { useScrollAnimation } from "../../lib/use-scroll-animation";
import { type FaqItem as FaqData } from "../../dog-info.data";
import styles from "./faq-section.module.scss";
import FaqItem from "./faq-item/FaqItem";

type FaqSectionProps = {
  faqs: FaqData[];
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
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              index={index}
              question={faq.q}
              answer={faq.a}
              isOpen={expandedIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
