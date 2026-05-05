"use client";

import { useScrollAnimation } from "../../lib/use-scroll-animation";
import styles from "./disclaimer-section.module.scss";

export default function DisclaimerSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div
          className={styles.box}
          ref={ref}
          data-animate="hidden"
        >
          <p className={styles.heading}>⚠️ 주의사항</p>
          <p className={styles.text}>
            본 콘텐츠는 일반적인 정보 제공을 목적으로 하며, 수의학적 조언이나
            전문 훈련사의 상담을 대체할 수 없습니다.
          </p>
          <p className={styles.text}>
            강아지의 건강이나 행동에 문제가 있다면 반드시 수의사 또는 전문
            훈련사와 상담하시기 바랍니다.
          </p>
          <p className={styles.source}>
            콘텐츠 출처: 수의사 감수, 반려동물 행동 전문가 자문, 반려견 보호자
            커뮤니티
          </p>
        </div>
      </div>
    </section>
  );
}
