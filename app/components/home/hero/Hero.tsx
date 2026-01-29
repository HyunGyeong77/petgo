import styles from './hero.module.scss';
import Background from './assets/images/bg.jpg';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className={styles.wrap}>
      <div className={styles["bg-box"]}>
        <Image className={styles.bg} src={Background} alt="background image" width={1920} height={1275} />
      </div>
    </div>
  );
}