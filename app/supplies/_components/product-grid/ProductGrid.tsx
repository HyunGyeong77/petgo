import { Heart, ShoppingCart } from 'lucide-react';
import { FlatProduct } from '@/lib/supplies';
import styles from './product-grid.module.scss';

type ProductGridProps = {
  products: FlatProduct[];
  favorites: Set<string>;
  onToggleFavorite: (key: string) => void;
};

export function ProductGrid({ products, favorites, onToggleFavorite }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.productsSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.productsHeader}>
          <h2 className={styles.sectionTitle}>상품 목록</h2>
          <p className={styles.productsCount}>총 {products.length}개의 상품</p>
        </div>

        <div className={styles.productsGrid}>
          {products.map(({ key, product, categoryLabel }) => (
            <div key={key} className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <button
                  onClick={() => onToggleFavorite(key)}
                  className={styles.favoriteBtn}
                >
                  <Heart
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      fill: favorites.has(key) ? '#ff6b6b' : 'none',
                      color: favorites.has(key) ? '#ff6b6b' : 'white',
                      stroke: favorites.has(key) ? '#ff6b6b' : 'white',
                      strokeWidth: 2,
                    }}
                  />
                </button>
                <div className={styles.productCategory}>{categoryLabel}</div>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>

                <div className={styles.productFooter}>
                  <div className={styles.productPrice}>
                    {product.price.toLocaleString()}원
                  </div>
                  <button className={styles.cartBtn}>
                    <ShoppingCart style={{ width: '1rem', height: '1rem' }} />
                    담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
