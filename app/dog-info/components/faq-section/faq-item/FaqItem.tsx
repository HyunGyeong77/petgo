"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './faq-item.module.scss';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

const FaqItem = ({ question, answer, isOpen, onToggle, index }: FaqItemProps) => {
  return (
    <div
      className={`${styles.item} ${isOpen ? styles.open : ""}`}
      data-animate="hidden"
      style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <button
        onClick={onToggle}
        className={styles.question}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          width={18}
          height={18}
          className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
        />
      </button>
      <div className={`${styles.answerContainer} ${isOpen ? styles.expanded : ''}`}>
        <div className={styles.answerInner}>
          <div className={styles.answer}>
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
