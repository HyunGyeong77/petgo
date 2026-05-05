"use client";

import { useScrollAnimation } from "../../lib/use-scroll-animation";
import styles from "./cta-section.module.scss";

export default function CtaSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      <div
        className={styles.inner}
        ref={ref}
        data-animate="hidden"
      >
        <h2 className={styles.title}>더 많은 정보가 필요하신가요?</h2>
        <p className={styles.subtitle}>
          산책 가이드와 용품 추천도 확인해보세요
        </p>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.primary}`}>
            산책 가이드 보기
          </button>
          <button className={`${styles.btn} ${styles.secondary}`}>
            추천 용품 보기
          </button>
        </div>
      </div>
    </section>
  );
}
