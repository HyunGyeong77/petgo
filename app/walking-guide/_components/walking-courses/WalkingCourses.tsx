import { MapPin, Clock } from 'lucide-react';
import styles from './walking-courses.module.scss';
import { walkingCourses, WalkingCourse } from '../../walking-guide.data';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const DIFFICULTY_CLASS: Record<WalkingCourse['difficulty'], string> = {
  '쉬움': styles.basic,
  '보통': styles.intermediate,
  '어려움': styles.advanced,
};

const WalkingCourses = () => {
  return (
    <section id="walking-courses" className={styles.checklistSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>추천 산책 코스</h2>
          <p className={styles.cardSubtitle}>강아지와 함께하기 좋은 산책 코스를 확인하세요</p>
        </ScrollReveal>
        <div className={styles.checklistGrid}>
          {walkingCourses.map((course, index) => (
            <ScrollReveal key={course.id} delay={(index % 3) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className={styles.checklistCard}>
                <div className={styles.articleContent}>
                  <div className={styles.courseHeader}>
                    <h3 className={styles.articleTitle}>{course.name}</h3>
                    <span className={`${styles.badge} ${DIFFICULTY_CLASS[course.difficulty]}`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <p className={styles.categoryDescription}>{course.description}</p>

                  <div className={styles.courseMetaRow}>
                    <div className={styles.courseMeta}>
                      <MapPin className={styles.courseMetaIcon} />
                      <span className={styles.courseMetaText}>{course.distance}</span>
                    </div>
                    <div className={styles.courseMeta}>
                      <Clock className={styles.courseMetaIcon} />
                      <span className={styles.courseMetaText}>{course.duration}</span>
                    </div>
                  </div>

                  <div className={styles.courseTags}>
                    {course.features.map((feature) => (
                      <span key={feature} className={styles.courseTag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalkingCourses;
