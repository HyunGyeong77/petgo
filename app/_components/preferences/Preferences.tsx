import styles from './preferences.module.scss';
import Like1Img from './assets/like1.webp';
import Like2Img from './assets/like2.webp';
import Like3Img from './assets/like3.webp';
import Bad1Img from './assets/bad1.webp';
import Bad2Img from './assets/bad2.webp';
import Bad3Img from './assets/bad3.webp';

interface PreferenceCard {
  img: string;
  alt: string;
  title: string;
  items: string[];
  note: string;
}

const LIKES: PreferenceCard[] = [
  {
    img: Like1Img.src,
    alt: '보호자와의 교감 이미지',
    title: '보호자와의 교감',
    items: ['쓰다듬기', '눈 맞추기', '이름 불러주기'],
    note: '혼자 있는 시간 보다 함께 있는 시간을 더 좋아해요!',
  },
  {
    img: Like2Img.src,
    alt: '규칙적인 산책과 탐색 이미지',
    title: '규칙적인 산책과 탐색',
    items: ['냄새 맡기', '새로운 길 걷기', '천천히 걷는 산책'],
    note: '운동보다는 탐색 자체가 스트레스 해소에 도움이 돼요!',
  },
  {
    img: Like3Img.src,
    alt: '칭찬과 보상',
    title: '칭찬과 보상',
    items: ['긍정적인 말', '간식 보상', '차분한 톤의 목소리'],
    note: '혼내는 것보다 칭찬이 학습 효과가 더 커요!',
  },
];

const DISLIKES: PreferenceCard[] = [
  {
    img: Bad1Img.src,
    alt: '갑작스러운 큰 소리',
    title: '갑작스러운 큰 소리',
    items: ['큰 고함 지르기', '갑자기 나는 소음', '청소기, 폭죽 소리'],
    note: '불안과 공포를 가장 크게 유발해요.',
  },
  {
    img: Bad2Img.src,
    alt: '강압적인 행동',
    title: '강압적인 행동',
    items: ['억지로 안기', '강제로 끌어당기기', '혼내며 위에서 내려다보기'],
    note: '신뢰가 빠르게 무너져요.',
  },
  {
    img: Bad3Img.src,
    alt: '혼자 오래 방치되는 시간',
    title: '혼자 오래 방치되는 시간',
    items: ['긴 외출', '보호자 부재', '자극 없는 환경'],
    note: '분리불안 또는 문제 행동의 원인이 될 수 있어요.',
  },
];

function PreferenceCard({ card }: { card: PreferenceCard }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={card.img} alt={card.alt} className={styles.cardImage} />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{card.title}</p>
        <ul className={styles.cardList}>
          {card.items.map((item) => (
            <li key={item} className={styles.cardItem}>
              <span className={styles.bullet}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={styles.cardNote}>{card.note}</p>
      </div>
    </div>
  );
}

export default function Preferences() {
  return (
    <section id="preferences" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.group}>
          <h2 className={styles.heading}>
            반려견이 <strong className={styles.accentAmber}>좋아하는 것</strong>을 아시나요 ?
          </h2>
          <div className={styles.grid}>
            {LIKES.map((card) => (
              <PreferenceCard key={card.title} card={card} />
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <h2 className={styles.heading}>
            반대로 반려견이 <strong className={styles.accentRed}>싫어하는 것</strong>을 아시나요 ?
          </h2>
          <div className={styles.grid}>
            {DISLIKES.map((card) => (
              <PreferenceCard key={card.title} card={card} />
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            알면 알수록 반려견과의 관계는{' '}
            <span className={styles.accentAmber}>더욱 깊어집니다 😊</span>
          </p>
          <a href="#" className={styles.ctaBtn}>반려견과 친해지러 가기</a>
        </div>
      </div>
    </section>
  );
}
