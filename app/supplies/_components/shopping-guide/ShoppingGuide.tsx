import styles from './shopping-guide.module.scss';

type TipItem = {
  emoji: string;
  tip: string;
};

type GuideCard = {
  title: string;
  subtitle: string;
  items: TipItem[];
};

const GUIDE_CARDS: GuideCard[] = [
  {
    title: '초보 보호자 필수템',
    subtitle: '처음 강아지를 키우신다면 이것부터!',
    items: [
      { emoji: '🍖', tip: '사료: 강아지 나이와 크기에 맞는 것으로' },
      { emoji: '🦴', tip: '목줄/하네스: 산책 필수품' },
      { emoji: '🚽', tip: '배변패드: 실내 배변 훈련용' },
      { emoji: '🥣', tip: '물·밥그릇: 스테인리스 추천' },
      { emoji: '🧸', tip: '장난감: 혼자 놀 수 있는 것' },
    ],
  },
  {
    title: '구매 시 체크포인트',
    subtitle: '용품 선택 전 확인하세요',
    items: [
      { emoji: '📏', tip: '크기: 우리 강아지에게 맞는 사이즈인지' },
      { emoji: '🔍', tip: '재질: 안전한 소재로 만들어졌는지' },
      { emoji: '⭐', tip: '리뷰: 다른 사용자들의 평가 확인' },
      { emoji: '💰', tip: '가격: 합리적인 가격대인지 비교' },
      { emoji: '🔄', tip: '교환/환불: 정책 미리 확인' },
    ],
  },
];

export function ShoppingGuide() {
  return (
    <section className={styles.guideSection}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>용품 구매 가이드</h2>
        <div className={styles.guideGrid}>
          {GUIDE_CARDS.map((card, index) => (
            <div key={index} className={styles.tipsCard}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
              <div className={styles.tipsItems}>
                {card.items.map((item, i) => (
                  <div key={i} className={styles.tipItem}>
                    <span className={styles.tipEmoji}>{item.emoji}</span>
                    <p className={styles.tipText}>{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
