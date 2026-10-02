import styles from './walking-timing-guide.module.scss';
import { timingGuide } from '../../walking-guide.data';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const WalkingTimingGuide = () => {
  return (
    <section className={styles.articleSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>크기별 산책 시간 가이드</h2>
          <p className={styles.cardSubtitle}>강아지 크기에 맞는 적정 산책 시간과 거리를 확인하세요</p>
        </ScrollReveal>
        <div className={styles.articleGrid}>
          {timingGuide.map((guide, index) => (
            <ScrollReveal key={guide.size} delay={(index % 3) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className={styles.articleCard}>
                <div className={styles.articleContent}>
                  <h3 className={styles.articleTitle}>{guide.size}</h3>
                  <div className={styles.timingDetails}>
                    <div className={styles.timingRow}>
                      <span className={styles.timingLabel}>시간: </span>
                      <span className={styles.timingValue}>{guide.duration}</span>
                    </div>
                    <div className={styles.timingRow}>
                      <span className={styles.timingLabel}>횟수: </span>
                      <span className={styles.timingValue}>{guide.frequency}</span>
                    </div>
                    <div className={styles.timingRow}>
                      <span className={styles.timingLabel}>거리: </span>
                      <span className={styles.timingValue}>{guide.distance}</span>
                    </div>
                    <p className={styles.timingNote}>💡 {guide.notes}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingTimingGuide;
