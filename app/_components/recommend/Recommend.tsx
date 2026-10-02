'use client';

import styles from './recommend.module.scss';
import CategoryBlock from './category-block/CategoryBlock';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import { useRecommendCategoryTree } from '@/features/recommend/hooks/useRecommend';
import { LoadingBoundary } from '@/components/loading/LoadingBoundary';
import { ContentSkeleton } from '@/components/ui/loading/content-skeleton/ContentSkeleton';

export default function Recommend() {
  const parentCategories = useRecommendCategoryTree();

  return (
    <section id="recommend" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Product Recommendation</span>
            <h2 className={styles.heading}>반려견에게 이런 용품들을 추천해요!</h2>
            <p className={styles.subheading}>
              수의사와 전문가가 엄선한 반려견 필수 용품들을 카테고리별로 확인해보세요
            </p>
          </div>
        </ScrollReveal>

        <LoadingBoundary 
          isLoading={parentCategories.isPending}
          fallback={<ContentSkeleton />}  
        >
          <div className={styles.card}>
            {parentCategories.data?.map((parent, idx) => (
              <ScrollReveal key={parent.label} delay={idx as 0 | 1 | 2 | 3 | 4 | 5}>
                <CategoryBlock parentCategory={parent} category={idx + 1} />
              </ScrollReveal>
            ))}
          </div>
        </LoadingBoundary>
      </div>
    </section>
  );
}
