"use client";

import React from 'react';
import styles from './walking-hero.module.scss';
import { walkingCourses, safetyTips, faqData } from '../../walking-guide.data';

const WalkingHero = () => {
  const stats = [
    { label: '추천 코스', value: walkingCourses.length, targetId: 'walking-courses' },
    { label: '안전 수칙', value: safetyTips.length, targetId: 'walking-safety-tips' },
    { label: '날씨 팁', value: 4, targetId: 'walking-weather-tips' }, // weatherTips length is 4
    { label: 'FAQ', value: faqData.length, targetId: 'walking-faq' },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>산책 가이드</h1>
        <p className={styles.heroSubtitle}>안전하고 즐거운 산책을 위한 완벽 가이드</p>
        <p className={styles.heroDescription}>산책 준비부터 코스 추천, 날씨별 팁까지 모두 알려드려요</p>

        <div className={styles.quickStats}>
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className={styles.statCard}
              onClick={() => handleScroll(stat.targetId)}
              role="button"
              tabIndex={0}
            >
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingHero;
