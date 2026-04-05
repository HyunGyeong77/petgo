import styles from './hero.module.scss';
import BgImg from './assets/bg.webp';
import DogImg from './assets/dog.webp';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <img
        src={BgImg.src}
        alt="background"
        className={styles.bgImage}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <img
          src={DogImg.src}
          alt="dog"
          className={styles.dogImage}
        />
        <h1 className={styles.title}>반려견을 더 잘 이해하는 방법</h1>
        <p className={styles.subtitle}>
          강아지가 좋아하는 것부터 산책, 용품, 병원 정보까지 한 곳에서 확인하세요.
        </p>
      </div>

      <div className={styles.scrollIndicator}>
        <i className="ri-arrow-down-line" />
        <span>아래로 스크롤</span>
      </div>
    </section>
  );
}
