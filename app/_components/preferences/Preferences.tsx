import styles from './preferences.module.scss';
import { LIKES, DISLIKES } from './preference';
import PreferenceCard from './preference-card/PreferenceCard';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import { ROUTES } from '@/constants/routes';

export default function Preferences() {
  return (
    <section id="preferences" className={styles.section}>
      <div className={styles.inner}>
        {/* 좋아하는 것 */}
        <div className={styles.group}>
          <ScrollReveal>
            <h2 className={styles.heading}>
              반려견이 <strong className={styles.accentAmber}>좋아하는 것</strong>을 아시나요 ?
            </h2>
          </ScrollReveal>

          <div className={styles.grid}>
            {LIKES.map((card, idx) => (
              <ScrollReveal key={card.title} delay={idx as 0 | 1 | 2}>
                <PreferenceCard card={card} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 싫어하는 것 */}
        <div className={styles.group}>
          <ScrollReveal>
            <h2 className={styles.heading}>
              반대로 반려견이 <strong className={styles.accentRed}>싫어하는 것</strong>을 아시나요 ?
            </h2>
          </ScrollReveal>

          <div className={styles.grid}>
            {DISLIKES.map((card, idx) => (
              <ScrollReveal key={card.title} delay={idx as 0 | 1 | 2}>
                <PreferenceCard card={card} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <ScrollReveal>
            <p className={styles.ctaText}>
              알면 알수록 반려견과의 관계는{' '}
              <span className={styles.accentAmber}>더욱 깊어집니다 😊</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <a href={ROUTES.app.dogInfo} className={styles.ctaBtn}>반려견과 친해지러 가기</a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
