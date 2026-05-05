export type ProfileFormState = {
  nickname: string;
  email: string;
  password: string;
};

export type WishItem = {
  id: number;
  name: string;
  price: number;
  imageText: string;
  href: string;
  selected: boolean;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  imageText: string;
  href: string;
  quantity: number;
  selected: boolean;
};

export type CombinedWishCartTab = "cart" | "wish";
