export interface Product {
  id: string;
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