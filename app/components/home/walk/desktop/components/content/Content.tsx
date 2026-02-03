import styles from './content.module.scss';
import Image, { StaticImageData } from 'next/image';

type Props = {
  recommend: string,
  reason: string,
  image: StaticImageData
  direction: string
}

export default function Content(props: Props) {
  return (
    <div className={styles.wrap}>
      <Image className={styles.bg} src={props.image} alt={props.recommend} width={264} height={180} />
      <div className={`${styles["content-box"]} ${styles[props.direction]}`}>
        <p className={styles.recommend}>{props.recommend}</p>
        <span className={styles.reason}>{props.reason}</span>
      </div>
    </div>
  );
}