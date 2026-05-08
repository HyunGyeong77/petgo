import styles from './supplies-hero.module.scss';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

type Stat = {
  label: string;
  value: number;
  targetId?: string;
};

type SuppliesHeroProps = {
  stats: Stat[];
};

export function SuppliesHero({ stats }: SuppliesHeroProps) {
  const handleScroll = (id?: string) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <ScrollReveal>
          <h1 className={styles.heroTitle}>반려견 용품</h1>
          <p className={styles.heroSubtitle}>우리 강아지에게 꼭 필요한 용품을 찾아보세요</p>
          <p className={styles.heroDescription}>사료부터 장난감, 케어 용품까지 모두 모았어요</p>
        </ScrollReveal>

        <div className={styles.quickStats}>
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={(index % 6) as 0 | 1 | 2 | 3 | 4 | 5}>
              <button
                onClick={() => handleScroll(stat.targetId)}
                className={`${styles.statCard} ${stat.targetId ? styles.clickable : ''}`}
                disabled={!stat.targetId}
              >
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
