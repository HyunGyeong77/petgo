'use client';

import { useState, useEffect } from 'react';
import styles from './recommend.module.scss';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/lib/toast';
import CategoryBlock from './category-block/CategoryBlock';

export interface Product {
  description: string;
  image: string;
  name: string;
  price: string;
}

export interface Category {
  label: string;
  products: Product[];
}

export interface Products {
  categories: Category[];
  label: string;
}

export default function Recommend() {
  const [products, setProducts] = useState<Products | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
        .from("category_tree").select("result").single();

        if(error) {throw new Error(error.message);}

        setProducts(data.result);
      } catch (err) {
        console.error('Error: ', err);
        showToast('error', "상품 목록을 불러오는데 실패했습니다.");
      }
    }

    fetchData();
  }, []);
  
  if(!products) return null;

  return (
    <section id="recommend" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Product Recommendation</span>
          <h2 className={styles.heading}>반려견에게 이런 용품들을 추천해요!</h2>
          <p className={styles.subheading}>
            수의사와 전문가가 엄선한 반려견 필수 용품들을 카테고리별로 확인해보세요
          </p>
        </div>

        <div className={styles.card}>
          {Object.values(products).map(product => (
            <CategoryBlock key={product.label} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
