"use client";

import { MainCategory, ProductsData } from "@/lib/supplies";
import styles from "./sticky-filter-bar.module.scss";

type StickyFilterBarProps = {
  data: ProductsData;
  selectedMainCategory: string | null;
  selectedSubCategory: string | null;
  priceFilter: string;
  onMainCategorySelect: (key: string) => void;
  onSubCategoryChange: (key: string | null) => void;
  onPriceFilterChange: (value: string) => void;
  isVisible: boolean;
};

export function StickyFilterBar({
  data,
  selectedMainCategory,
  selectedSubCategory,
  priceFilter,
  onMainCategorySelect,
  onSubCategoryChange,
  onPriceFilterChange,
  isVisible,
}: StickyFilterBarProps) {
  if (!isVisible) return null;

  const currentMainCategory = selectedMainCategory ? data[selectedMainCategory] : null;

  const priceOptions = [
    { label: '전체 가격', value: 'all' },
    { label: '2만원↓', value: 'under20' },
    { label: '2~4만', value: '20to40' },
    { label: '4만↑', value: 'over40' },
  ];

  return (
    <div className={styles.stickyBar}>
      <div className={styles.container}>
        {/* Row 1: Main Categories */}
        <div className={styles.filterSection}>
          <span className={styles.sectionLabel}>카테고리</span>
          <div className={styles.scrollContainer}>
            {Object.entries(data).map(([key, mainCat]) => (
              <button
                key={key}
                onClick={() => onMainCategorySelect(key)}
                className={`${styles.mainCatBtn} ${selectedMainCategory === key ? styles.active : ''}`}
              >
                {mainCat.label}
              </button>
            ))}
          </div>
        </div>

        {currentMainCategory && (
          <>
            {/* Row 2: Sub Categories */}
            <div className={styles.filterSection}>
              <span className={styles.sectionLabel}>세부 카테고리</span>
              <div className={styles.scrollContainer}>
                <button
                  onClick={() => onSubCategoryChange(null)}
                  className={`${styles.filterBtn} ${selectedSubCategory === null ? styles.active : ''}`}
                >
                  전체
                </button>
                {Object.entries(currentMainCategory.categories).map(([key, subCat]) => (
                  <button
                    key={key}
                    onClick={() => onSubCategoryChange(key)}
                    className={`${styles.filterBtn} ${selectedSubCategory === key ? styles.active : ''}`}
                  >
                    {subCat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Price Filter */}
            <div className={styles.filterSection}>
              <span className={styles.sectionLabel}>가격대</span>
              <div className={styles.scrollContainer}>
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onPriceFilterChange(option.value)}
                    className={`${styles.filterBtn} ${styles.priceBtn} ${priceFilter === option.value ? styles.active : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
