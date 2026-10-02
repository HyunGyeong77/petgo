import styles from './walking-after-care.module.scss';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const afterCareItems = [
  { emoji: '🐾', tip: '발바닥 확인: 상처, 이물질, 염증이 없는지 체크하고 깨끗이 닦아주세요.' },
  { emoji: '💧', tip: '물 제공: 충분한 물을 마실 수 있도록 하되, 한꺼번에 너무 많이 마시지 않게 하세요.' },
  { emoji: '🛁', tip: '몸 닦기: 발과 배, 귀 주변을 물티슈나 타월로 닦아주세요.' },
  { emoji: '🧘', tip: '휴식 시간: 30분~1시간 정도 쉬게 한 후 밥을 주세요.' },
  { emoji: '🔍', tip: '진드기 확인: 귀, 발가락 사이, 배 등을 꼼꼼히 확인하세요.' },
];

const WalkingAfterCare = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.ctaTitle}>산책 후 관리</h2>
          <p className={styles.ctaSubtitle}>산책 후에는 이렇게 관리하세요</p>
        </ScrollReveal>
        <div className={styles.tipsItems}>
          {afterCareItems.map((item, index) => (
            <ScrollReveal key={item.emoji} delay={(index % 5) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className={styles.tipItem}>
                <span className={styles.tipEmoji}>{item.emoji}</span>
                <p className={styles.tipText}>{item.tip}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingAfterCare;
