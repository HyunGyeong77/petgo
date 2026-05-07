"use client";

import React, { useState } from 'react';
import styles from './walking-faq.module.scss';
import { faqData } from '../../walking-guide.data';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import FaqItem from './faq-item/FaqItem';

const WalkingFaq = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section id="walking-faq" className={styles.faqSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
          <p className={styles.cardSubtitle}>산책에 대해 궁금한 점을 확인하세요</p>
        </ScrollReveal>
        <div className={styles.faqItems}>
          {faqData.map((faq, index) => (
            <ScrollReveal key={faq.q} delay={(index % 5) as 0 | 1 | 2 | 3 | 4 | 5}>
              <FaqItem
                question={faq.q}
                answer={faq.a}
                isOpen={expandedFaq === index}
                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingFaq;
