import styles from './content.module.scss';

export default function Content({recommend, reason}: {recommend: string, reason: string}) {
  return (
    <div className={styles.wrap}>
      <p className={styles.recommend}>{recommend}</p>
      <span className={styles.reason}>{reason}</span>
    </div>
  );
}