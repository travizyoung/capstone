import { CategoryItem } from "../category/category.types";

export enum CART_ACTION_TYPES {
  SET_NEW_CART_ITEMS = "cart/SET_NEW_CART_ITEMS",
  TOGGLE_CART_OPEN = "cart/TOGGLE_CART_OPEN",
}

export type CartItem = CategoryItem & {
  quantity: number;
};

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};
