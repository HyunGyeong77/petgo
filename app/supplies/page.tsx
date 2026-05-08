"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Loading from '@/components/ui/loading/Loading';
import { SuppliesHero } from './_components/supplies-hero/SuppliesHero';
import { CategoryNav } from './_components/category-nav/CategoryNav';
import { SubCategoryFilter } from './_components/sub-category-filter/SubCategoryFilter';
import { StickyFilterBar } from './_components/sticky-filter-bar/StickyFilterBar';
import { ProductGrid } from './_components/product-grid/ProductGrid';
import { PopularProducts } from './_components/popular-products/PopularProducts';
import { ShoppingGuide } from './_components/shopping-guide/ShoppingGuide';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';
import { useProduct } from '@/hooks/useProduct';
import {
  getFilteredProducts,
  getPopularProducts,
  getTotalProductCount,
  MainCategory,
} from '@/lib/supplies';
import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';

export default function SuppliesPage() {
  const productsData = useProduct();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [priceFilter, setPriceFilter] = useState<string>('all');
  
  const [showStickyBar, setShowStickyBar] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (productsData && !selectedMainCategory) {
      setSelectedMainCategory(Object.keys(productsData)[0]);
    }
  }, [productsData, selectedMainCategory]);

  useEffect(() => {
    const category = searchParams.get("category");

    setSelectedMainCategory(category || "");
  }, [searchParams]);

  if (!productsData) {
    return <Loading />;
  }

  const toggleFavorite = (productKey: string): void => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productKey)) {
        next.delete(productKey);
      } else {
        next.add(productKey);
      }
      return next;
    });
  };

  const handleMainCategorySelect = (key: string): void => {
    setSelectedMainCategory(key);
    setSelectedSubCategory(null);
  };

  const stats = [
    { label: '전체 상품', value: getTotalProductCount(productsData), targetId: 'product-grid' },
    { label: '카테고리', value: Object.keys(productsData).length, targetId: 'category-nav' },
    { label: '찜한 상품', value: favorites.size, targetId: 'product-grid' },
    { label: '오늘의 특가', value: 12, targetId: 'popular-products' },
  ];

  const currentMainCategory: MainCategory | null = selectedMainCategory
    ? productsData[selectedMainCategory]
    : null;

  return (
    <div className={styles.container}>
      <Header />
      <StickyFilterBar
        data={productsData}
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        priceFilter={priceFilter}
        onMainCategorySelect={handleMainCategorySelect}
        onSubCategoryChange={setSelectedSubCategory}
        onPriceFilterChange={setPriceFilter}
        isVisible={showStickyBar}
      />
      <main className={styles.main}>
        <SuppliesHero stats={stats} />
        
        <div id="category-nav" ref={navRef} className={styles.sectionWrapper}>
          <ScrollReveal>
            <CategoryNav
              data={productsData}
              selectedMainCategory={selectedMainCategory}
              onSelect={handleMainCategorySelect}
            />
          </ScrollReveal>
        </div>

        {currentMainCategory && (
          <div className={styles.sectionWrapper}>
            <ScrollReveal>
              <SubCategoryFilter
                currentMainCategory={currentMainCategory}
                selectedSubCategory={selectedSubCategory}
                priceFilter={priceFilter}
                onSubCategoryChange={setSelectedSubCategory}
                onPriceFilterChange={setPriceFilter}
              />
            </ScrollReveal>
          </div>
        )}

        <div id="product-grid" className={styles.sectionWrapper}>
          <ScrollReveal>
            <ProductGrid
              products={getFilteredProducts(productsData, selectedMainCategory, selectedSubCategory, priceFilter)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </ScrollReveal>
        </div>

        <div id="popular-products" className={styles.sectionWrapper}>
          <ScrollReveal>
            <PopularProducts products={getPopularProducts(productsData)} />
          </ScrollReveal>
        </div>

        <div className={styles.sectionWrapper}>
          <ScrollReveal>
            <ShoppingGuide />
          </ScrollReveal>
        </div>

        <section className={styles.disclaimerSection}>
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <div className={styles.disclaimerContent}>
                <p className={styles.disclaimerTitle}>⚠️ 구매 안내</p>
                <p>본 페이지는 반려견 용품 정보 제공을 목적으로 하며, 실제 구매는 신뢰할 수 있는 판매처를 통해 진행하시기 바랍니다.</p>
                <p>제품 가격 및 재고는 변동될 수 있으며, 구매 전 상품 상세 정보를 반드시 확인하세요.</p>
                <p>강아지의 크기, 나이, 건강 상태에 따라 적합한 용품이 다를 수 있으니 신중하게 선택하시기 바랍니다.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
