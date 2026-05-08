import { Filter } from 'lucide-react';
import { MainCategory } from '@/lib/supplies';
import styles from './sub-category-filter.module.scss';

type SubCategoryFilterProps = {
  currentMainCategory: MainCategory;
  selectedSubCategory: string | null;
  priceFilter: string;
  onSubCategoryChange: (key: string | null) => void;
  onPriceFilterChange: (value: string) => void;
};

export function SubCategoryFilter({
  currentMainCategory,
  selectedSubCategory,
  priceFilter,
  onSubCategoryChange,
  onPriceFilterChange,
}: SubCategoryFilterProps) {
  const priceOptions = [
    { label: '전체 가격', value: 'all' },
    { label: '2만원 미만', value: 'under20' },
    { label: '2~4만원', value: '20to40' },
    { label: '4만원 이상', value: 'over40' },
  ];

  return (
    <section className={styles.filterSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.filterGroup}>
          <div className={styles.groupHeader}>
            <Filter style={{ width: '1rem', height: '1rem', color: '#ff9a3c' }} />
            <h3 className={styles.groupTitle}>세부 카테고리</h3>
          </div>
          <div className={styles.subCategoryList}>
            <button
              onClick={() => onSubCategoryChange(null)}
              className={`${styles.filterBtn} ${
                selectedSubCategory === null ? styles.active : ''
              }`}
            >
              전체
            </button>
            {Object.entries(currentMainCategory.categories).map(([key, subCat]) => (
              <button
                key={key}
                onClick={() => onSubCategoryChange(key)}
                className={`${styles.filterBtn} ${
                  selectedSubCategory === key ? styles.active : ''
                }`}
              >
                {subCat.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.groupHeader}>
            <div className={styles.dot} />
            <h3 className={styles.groupTitle}>가격대별 필터</h3>
          </div>
          <div className={styles.priceFilterList}>
            {priceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onPriceFilterChange(option.value)}
                className={`${styles.filterBtn} ${
                  priceFilter === option.value ? styles.active : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
