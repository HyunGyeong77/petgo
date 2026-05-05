"use client";

import { useScrollAnimation } from "../../lib/use-scroll-animation";
import styles from "./learning-path-section.module.scss";

const STEPS = [
  {
    week: "1-2주차",
    title: "교감과 신뢰 쌓기",
    desc: "강아지와의 관계 형성이 최우선",
  },
  {
    week: "3-4주차",
    title: "기본 훈련 시작",
    desc: "간단한 명령어부터 차근차근",
  },
  {
    week: "5-6주차",
    title: "보상 체계 확립",
    desc: "효과적인 보상 방법 익히기",
  },
  {
    week: "7주차 이후",
    title: "문제 행동 관리",
    desc: "상황별 대처법 학습",
  },
];

export default function LearningPathSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const pathRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div
          className={styles.header}
          ref={headerRef}
          data-animate="hidden"
        >
          <h2 className={styles.title}>추천 학습 순서</h2>
          <p className={styles.subtitle}>단계별로 차근차근 따라오세요</p>
        </div>
        <div className={styles.path} ref={pathRef}>
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={styles.step}
              data-animate="hidden"
              style={{ "--delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <div className={styles.stepLeft}>
                <div className={styles.stepNumber}>{index + 1}</div>
                {index < STEPS.length - 1 && (
                  <div className={styles.connector} />
                )}
              </div>
              <div className={styles.stepContent}>
                <p className={styles.stepWeek}>{step.week}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
