import styles from './hero.module.scss';
import Background from './assets/images/bg.jpg';
import DownIcon from './assets/gifs/down.gif';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className={styles.wrap}>
      <div className={styles["bg-box"]}>
        <Image className={styles.bg} src={Background} alt="background image" width={1920} height={1275} />
      </div>
      <div className={styles["content-layout"]}>
        <div className={styles.content}>
          <h2>반려견을 더 잘 이해하는 방법</h2>
          <p className={styles.word}>강아지가 좋아하는 것부터 산책, 용품, 병원 정보까지 한 곳에서 확인하세요.</p>
        </div>
        <div className={styles.notify}>
          <Image className={styles["down-img"]} src={DownIcon} alt="down icon" width={17} height={13} />
          <span>아래로 스크롤</span>
        </div>
      </div>
    </div>
  );
}