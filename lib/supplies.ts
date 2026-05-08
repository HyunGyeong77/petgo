// ─── Types ────────────────────────────────────────────────────────────────────

export type Product = {
  name: string;
  image: string;
  price: number;
  description: string;
};

export type Category = {
  label: string;
  products: Record<string, Product>;
};

export type MainCategory = {
  label: string;
  categories: Record<string, Category>;
};

export type ProductsData = Record<string, MainCategory>;

export type FlatProduct = {
  key: string;
  product: Product;
  categoryLabel: string;
};

export type PriceFilter = 'all' | 'under20' | '20to40' | 'over40';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getTotalProductCount = (productsData: ProductsData): number =>
  Object.values(productsData).reduce(
    (sum, mainCat) =>
      sum +
      Object.values(mainCat.categories).reduce(
        (catSum, cat) => catSum + Object.keys(cat.products).length,
        0,
      ),
    0,
  );

export const getAllFlatProducts = (productsData: ProductsData): FlatProduct[] =>
  Object.entries(productsData).flatMap(([mainKey, mainCat]) =>
    Object.entries(mainCat.categories).flatMap(([subKey, subCat]) =>
      Object.entries(subCat.products).map(([prodKey, product]) => ({
        key: `${mainKey}-${subKey}-${prodKey}`,
        product: product as Product,
        categoryLabel: subCat.label,
      })),
    ),
  );

export const getFilteredProducts = (
  productsData: ProductsData,
  selectedMainCategory: string | null,
  selectedSubCategory: string | null,
  priceFilter: string,
): FlatProduct[] => {
  if (!selectedMainCategory) return [];

  const mainCat = productsData[selectedMainCategory];
  if (!mainCat) return [];

  let products: FlatProduct[] = [];

  Object.entries(mainCat.categories).forEach(([subKey, subCat]) => {
    if (!selectedSubCategory || selectedSubCategory === subKey) {
      Object.entries(subCat.products).forEach(([prodKey, product]) => {
        products.push({
          key: `${selectedMainCategory}-${subKey}-${prodKey}`,
          product: product as Product,
          categoryLabel: subCat.label,
        });
      });
    }
  });

  if (priceFilter !== 'all') {
    products = products.filter(({ product }) => {
      if (priceFilter === 'under20') return product.price < 20000;
      if (priceFilter === '20to40') return product.price >= 20000 && product.price < 40000;
      if (priceFilter === 'over40') return product.price >= 40000;
      return true;
    });
  }

  return products;
};

export const getPopularProducts = (
  productsData: ProductsData,
  count: number = 6,
): FlatProduct[] => getAllFlatProducts(productsData).slice(0, count);
