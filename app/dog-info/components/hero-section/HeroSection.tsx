import styles from "./hero-section.module.scss";

type HeroSectionProps = {
  totalArticles: number;
  bookmarkedCount: number;
  completedCount: number;
  categoryCount: number;
};

export default function HeroSection({
  totalArticles,
  bookmarkedCount,
  completedCount,
  categoryCount,
}: HeroSectionProps) {
  const stats = [
    { label: "전체 글", value: totalArticles },
    { label: "북마크", value: bookmarkedCount },
    { label: "완료", value: completedCount },
    { label: "카테고리", value: categoryCount },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.badge}>🐾 초보 보호자 가이드</div>
        <h1 className={styles.title}>강아지 정보</h1>
        <p className={styles.subtitle}>초보 보호자를 위한 필수 지식 가이드</p>
        <p className={styles.description}>
          교감부터 훈련, 문제 행동 해결까지 단계별로 배워보세요
        </p>
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
