import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd) => {
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

const subCartItem = (cartItems, productToSub) => {
  if (productToSub.quantity > 1) {
    return cartItems.map((item) =>
      item.id === productToSub.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  return cartItems.filter((item) => item.id !== productToSub.id);
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, cartItem) => {
  return createAction(
    CART_ACTION_TYPES.SET_NEW_CART_ITEMS,
    addCartItem(cartItems, cartItem)
  );
};

export const subItemFromCart = (cartItems, cartItem) => {
  return createAction(
    CART_ACTION_TYPES.SET_NEW_CART_ITEMS,
    subCartItem(cartItems, cartItem)
  );
};

export const removeItemFromCart = (cartItems, cartItem) => {
  return createAction(
    CART_ACTION_TYPES.SET_NEW_CART_ITEMS,
    removeCartItem(cartItems, cartItem)
  );
};
