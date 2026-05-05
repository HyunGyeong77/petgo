"use client";

import styles from "./category-section.module.scss";
import { Category, PostRow } from "../../page";
import { useScrollAnimation } from "../../lib/use-scroll-animation";

type CategorySectionProps = {
  groupedPosts: Record<string, PostRow[]>;
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
};

export default function CategorySection({
  groupedPosts,
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div
          className={styles.header}
          ref={headerRef}
          data-animate="hidden"
        >
          <h2 className={styles.title}>카테고리별 학습</h2>
          <p className={styles.subtitle}>원하는 주제를 선택해 시작하세요</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {Object.values(categories).map((category) => (
            <button
              key={category.category_id}
              onClick={() => onSelectCategory(category.category_id)}
              className={`${styles.card} ${
                selectedCategory === category.category_id ? styles.selected : ""
              }`}
            >
              <span className={styles.icon}>
                {category.icon ?? "📚"}
              </span>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <p className={styles.cardDescription}>{category.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.count}>
                  {groupedPosts[category.category_id]?.length ?? 0}개 글
                </span>
                <span className={styles.arrow}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
