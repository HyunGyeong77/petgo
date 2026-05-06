import React from 'react';
import styles from './walking-importance.module.scss';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const importanceItems = [
  { icon: '💪', title: '신체 건강', desc: '비만 예방과 근육 발달에 필수적입니다' },
  { icon: '🧠', title: '정신 건강', desc: '스트레스 해소와 사회성 발달에 도움됩니다' },
  { icon: '🎯', title: '문제 행동 감소', desc: '에너지를 소비해 짖음과 파괴행동이 줄어듭니다' },
  { icon: '❤️', title: '유대감 강화', desc: '보호자와의 신뢰와 애정이 깊어집니다' },
];

const WalkingImportance = () => {
  return (
    <section className={styles.categorySection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>왜 산책이 중요한가요?</h2>
        </ScrollReveal>
        <div className={styles.categoryGrid}>
          {importanceItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={(index % 4) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className={styles.categoryCard}>
                <p className={styles.categoryIcon}>{item.icon}</p>
                <h3 className={styles.categoryTitle}>{item.title}</h3>
                <p className={styles.categoryDescription}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingImportance;
