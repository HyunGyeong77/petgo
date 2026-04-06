import styles from './preference-card.module.scss';
import { PreferenceCard as CardType } from '../Preferences';

export default function PreferenceCard({ card }: { card: CardType }) {
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