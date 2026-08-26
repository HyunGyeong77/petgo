'use client';

import { useEffect, useState } from 'react';
import styles from './recommend.module.scss';
import { showToast } from '@/utils/toast';
import CategoryBlock from './category-block/CategoryBlock';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import { getCategoryTree } from '@/features/recommend/api/recommend-api';
import { Products } from '@/features/recommend/types/recommend.types';

export default function Recommend() {
  const [products, setProducts] = useState<Products | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategoryTree();

        setProducts(data);
      } catch (err) {
        console.error('Error: ', err);
        showToast('error', '상품 목록을 불러오는데 실패했습니다.');
      }
    };

    fetch();
  }, []);

  if (!products) return null;

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

        <div className={styles.card}>
          {Object.values(products).map((product, idx) => (
            <ScrollReveal key={product.label} delay={idx as 0 | 1 | 2 | 3 | 4 | 5}>
              <CategoryBlock products={product} category={idx + 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
