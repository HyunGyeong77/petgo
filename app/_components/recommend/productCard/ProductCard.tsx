import styles from './product-card.module.scss';
import { Product } from '../Recommend';

export default function ProductCard({ product }: { product: Product }) {
  const priceFormat = parseInt(product.price);

  return (
    <a key={product.name} href="#" className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productDesc}>{product.description}</p>
        <p className={styles.productPrice}>{priceFormat.toLocaleString()}원</p>
      </div>
    </a>
  );
}