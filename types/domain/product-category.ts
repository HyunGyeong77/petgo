import {Category} from "./category";

export type ProductCategory = {
  label: string,
  categories: Record<string, Category>
}