import { MainCategory } from '@/lib/supplies';
import styles from './category-nav.module.scss';

type CategoryNavProps = {
  data: Record<string, MainCategory>;
  selectedMainCategory: string | null;
  onSelect: (key: string) => void;
};

export function CategoryNav({ data, selectedMainCategory, onSelect }: CategoryNavProps) {
  return (
    <section className={styles.categorySection}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>카테고리</h2>
        <div className={styles.categoryGrid}>
          {Object.entries(data).map(([key, mainCat]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`${styles.categoryCard} ${
                selectedMainCategory === key ? styles.selected : ''
              }`}
            >
              <h3 className={styles.categoryTitle}>{mainCat.label}</h3>
              <p className={styles.categoryDescription}>
                {Object.keys(mainCat.categories).length}개 세부 카테고리
              </p>
              <div className={styles.categoryCount}>
                {Object.values(mainCat.categories).reduce(
                  (sum, cat) => sum + Object.keys(cat.products).length,
                  0
                )}개 상품 →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
