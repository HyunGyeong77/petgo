import {Product} from './product';

export type Category = {
  label: string,
  products: Record<string, Product>
}