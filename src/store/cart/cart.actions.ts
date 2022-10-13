import {
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../category/category.types";
import { createAction } from "../../utils/reducer/reducer.util";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const findResult = cartItems.find((item) => item.id === productToAdd.id);

  if (findResult) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subCartItem = (
  cartItems: CartItem[],
  productToSub: CartItem
): CartItem[] => {
  if (productToSub.quantity > 1) {
    return cartItems.map((item) =>
      item.id === productToSub.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  return cartItems.filter((item) => item.id !== productToSub.id);
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

// type
export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.TOGGLE_CART_OPEN,
  boolean
>;

export type SetNewCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_NEW_CART_ITEMS,
  CartItem[]
>;

// actions
export const setIsCartOpen = withMatcher((bool: boolean) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool);
});

export const setCartItems = withMatcher((cartItems: CartItem[]) => {
  return createAction(CART_ACTION_TYPES.SET_NEW_CART_ITEMS, cartItems);
});

export const addItemToCart = (cartItems: CartItem[], cartItem: CartItem) => {
  return setCartItems(addCartItem(cartItems, cartItem));
};

export const subItemFromCart = (cartItems: CartItem[], cartItem: CartItem) => {
  return setCartItems(subCartItem(cartItems, cartItem));
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItem: CartItem
) => {
  return setCartItems(removeCartItem(cartItems, cartItem));
};
