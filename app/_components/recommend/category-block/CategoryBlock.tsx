import styles from './category-block.module.scss';
import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../productCard/ProductCard';
import { Products } from '../Recommend';

export default function CategoryBlock({ products }: { products: Products }) {
  const [activeTab, setActiveTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);

  const currentCategories = Object.values(products.categories);
  const activeProducts = Object.values(currentCategories[activeTab]?.products || {});
  const totalProducts = activeProducts.length;

  const updateItemsToShow = useCallback(() => {
    if (window.innerWidth < 768) {
      setItemsToShow(1);
    } else if (window.innerWidth < 1024) {
      setItemsToShow(3);
    } else {
      setItemsToShow(5);
    }
  }, []);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [updateItemsToShow]);

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const nextSlide = () => {
    if (currentIndex < totalProducts - itemsToShow) {
      const nextIndex = Math.min(currentIndex + itemsToShow, totalProducts - itemsToShow);
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = Math.max(currentIndex - itemsToShow, 0);
      setCurrentIndex(prevIndex);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= totalProducts - itemsToShow || totalProducts <= itemsToShow;

  return (
    <div className={styles.categoryBlock}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{products.label}</h3>
      </div>

      <div className={styles.tabs}>
        {currentCategories.map((sub, idx) => (
          <button
            key={sub.label}
            className={`${styles.tab} ${activeTab === idx ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {sub.label}
          </button>
        ))}
      </div>

      <div className={styles.productCarousel}>
        <button
          className={styles.navBtn}
          onClick={prevSlide}
          disabled={isPrevDisabled}
          aria-label="이전 상품"
        >
          <i className="ri-arrow-left-s-line" />
        </button>

        <div className={styles.carouselContainer}>
          <div
            className={styles.productList}
            style={
              {
                '--offset': `calc(-${currentIndex} * (100% / ${itemsToShow} + 1rem / ${itemsToShow}))`,
              } as React.CSSProperties
            }
          >
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))
            ) : (
              <p className={styles.emptyMessage}>준비 중입니다.</p>
            )}
          </div>
        </div>

        <button
          className={styles.navBtn}
          onClick={nextSlide}
          disabled={isNextDisabled}
          aria-label="다음 상품"
        >
          <i className="ri-arrow-right-s-line" />
        </button>
      </div>

      <div className={styles.moreLink}>
        <a href="#" className={styles.moreLinkBtn}>
          <strong>{products.label}</strong> 더 알아보기
          <i className="ri-arrow-right-line" />
        </a>
      </div>

      <div className={styles.divider} />
    </div>
  );
}