"use client";

import { ChevronDown } from 'lucide-react';
import styles from './faq-item.module.scss';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  return (
    <div className={styles.faqItem}>
      <button
        onClick={onToggle}
        className={styles.faqButton}
        aria-expanded={isOpen}
      >
        <span className={styles.faqQuestion}>{question}</span>
        <ChevronDown
          className={`${styles.faqIcon} ${isOpen ? styles.expanded : ''}`}
        />
      </button>
      <div className={`${styles.answerContainer} ${isOpen ? styles.expanded : ''}`}>
        <div className={styles.answerInner}>
          <div className={styles.answerContent}>
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
