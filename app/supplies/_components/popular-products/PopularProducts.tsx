import { FlatProduct } from '@/lib/supplies';
import styles from './popular-products.module.scss';

type PopularProductsProps = {
  products: FlatProduct[];
};

export function PopularProducts({ products }: PopularProductsProps) {
  return (
    <section className={styles.popularSection}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>인기 상품 TOP 6</h2>
        <p className={styles.sectionSubtitle}>많은 분들이 선택한 베스트셀러</p>

        <div className={styles.popularGrid}>
          {products.map(({ key, product, categoryLabel }) => (
            <div key={key} className={styles.popularCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.popularImage}
              />
              <div className={styles.popularInfo}>
                <span className={styles.popularCategory}>{categoryLabel}</span>
                <h3 className={styles.popularName}>{product.name}</h3>
                <div className={styles.popularPrice}>
                  {product.price.toLocaleString()}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
