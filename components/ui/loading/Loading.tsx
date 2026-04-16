import styles from './loading.module.scss';
import GIF from './_assets/mxjfiles-paws-25466.gif';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
        <img className={styles.img} src={GIF.src} alt="로딩 gif" />
        <p className={styles.text}>잠시만 기다려 주세요</p>
    </div>
  );
}