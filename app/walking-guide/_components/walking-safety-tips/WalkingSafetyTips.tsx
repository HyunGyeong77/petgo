import React from 'react';
import styles from './walking-safety-tips.module.scss';
import { safetyTips } from '../../walking-guide.data';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const WalkingSafetyTips = () => {
  return (
    <section id="walking-safety-tips" className={styles.categorySection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>산책 중 안전 수칙</h2>
          <p className={styles.cardSubtitle}>안전한 산책을 위해 꼭 기억하세요</p>
        </ScrollReveal>
        <div className={styles.categoryGrid}>
          {safetyTips.map((tip, index) => (
            <ScrollReveal key={tip.title} delay={(index % 3) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className={styles.tipsCard}>
                <p className={styles.safetyIcon}>{tip.icon}</p>
                <h3 className={styles.cardTitle}>{tip.title}</h3>
                <p className={styles.categoryDescription}>{tip.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingSafetyTips;
