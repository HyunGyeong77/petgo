"use client";

import styles from './recommend.module.scss';
import {useState, useEffect} from 'react';
import {GetProductsResponse} from '@/types/api/product';
import Carousel from './components/carousel/Carousel';
import Loading from './components/loading/Loading';

export default function Recommend() {
  const [products, setProducts] = useState<GetProductsResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const res = await fetch("https://petgo-api.onrender.com/recommend");
      if(!res.ok) throw new Error();

      const data = await res.json();
      setProducts(data);
    } catch {
      setError("상품을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <article className={styles.wrap}>
      <h2 className={styles.title}>반려견에게 이런 용품들을 추천해요!</h2>
      <div className={styles["carousel-box"]}>
        {loading ? 
          <Loading /> :
          Object.values(products).map((category, cindex) => (
            <section key={category.label + cindex}>
              <Carousel category={category} loading={loading} error={error} />
            </section>
          ))
        }
      </div>
    </article>
  );
}