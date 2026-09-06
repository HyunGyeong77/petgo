import styles from './walk.module.scss';
import DogImg from './assets/c0ebc0206d5382ca3a1c5aa05c4b9819.jpg';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import { WALK_TIPS } from './walk-tips';

export default function Walk() {
  return (
    <section id="walk" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <h2 className={styles.heading}>산책은 어떻게 하면 좋을까요??</h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className={styles.imageWrapper}>
            <img
              src={DogImg.src}
              alt="산책하는 강아지"
              className={styles.dogImage}
            />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {WALK_TIPS.map((tip, idx) => (
            <ScrollReveal key={tip.title} delay={idx as 0 | 1 | 2 | 3}>
              <div className={styles.card}>
                <div className={styles.iconWrapper}>
                  <i className={`${tip.icon} ${styles.icon}`} />
                </div>
                <div className={styles.bubble}>
                  {tip.bubble}
                  <span className={styles.bubbleTail} />
                </div>
                <div className={styles.tip}>
                  <p className={styles.cardTitle}>{tip.title}</p>
                  <p className={styles.cardDesc}>{tip.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
