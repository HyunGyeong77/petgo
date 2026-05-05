import type { CartItem, WishItem } from "./profile-types";

export const INITIAL_WISH_ITEMS: WishItem[] = [
  { id: 1, name: "연어 트릿", price: 12000, imageText: "연어", href: "/products/1", selected: false },
  { id: 2, name: "저알러지 사료", price: 34000, imageText: "사료", href: "/products/2", selected: false },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 3,
    name: "산책 하네스",
    price: 28000,
    imageText: "하네스",
    href: "/products/3",
    quantity: 1,
    selected: false,
  },
  {
    id: 4,
    name: "배변 패드",
    price: 18000,
    imageText: "패드",
    href: "/products/4",
    quantity: 2,
    selected: false,
  },
];