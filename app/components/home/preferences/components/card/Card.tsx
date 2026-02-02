import styles from './card.module.scss';
import Image, { StaticImageData } from 'next/image';

type Props = {
  image: {src: StaticImageData, alt: string}
  title: string,
  things: string[],
  result: string
}

export default function Card(props: Props) {
  return (
    <div className={styles.wrap}>
      <Image src={props.image.src} alt={props.image.alt} width={1920} height={1280} />
      <div className={styles["contents-box"]}>
        <p className={styles.title}>{props.title}</p>
        <div className={styles["detail-box"]}>
          <ul>
            {props.things.map((thing, index) => (
              <li key={thing + index}>
                <p><span>•</span><span>{thing}</span></p>
              </li>
            ))}
          </ul>
          <p className={styles.result}>{props.result}</p>
        </div>
      </div>
    </div>
  );
}