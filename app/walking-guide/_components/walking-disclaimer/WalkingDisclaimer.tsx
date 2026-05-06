import React from 'react';
import styles from './walking-disclaimer.module.scss';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const WalkingDisclaimer = () => {
  return (
    <section className={styles.disclaimerSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <div className={styles.disclaimerContent}>
            <p className={styles.disclaimerTitle}>⚠️ 주의사항</p>
            <p>본 가이드는 일반적인 정보 제공을 목적으로 하며, 개별 강아지의 건강 상태나 특성에 따라 다를 수 있습니다.</p>
            <p>강아지가 산책 중이나 산책 후 평소와 다른 증상을 보이면 즉시 수의사와 상담하시기 바랍니다.</p>
            <p>극심한 더위나 추위, 폭우, 폭설 등 악천후에는 실내 활동으로 대체하는 것을 권장합니다.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WalkingDisclaimer;
