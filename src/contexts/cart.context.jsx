import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

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

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const CART_ACTION_TYPES = {
  SET_NEW_CART_ITEMS: "SET_NEW_CART_ITEMS",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
};

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_NEW_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, total } = state;

  const updateCartItemsReducer = (newCartItems) => {
    // get new count
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // get new total
    const newTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_NEW_CART_ITEMS, {
        cartCount: newCartCount,
        total: newTotal,
        cartItems: newCartItems,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool));
  };
  const addItemToCart = (cartItem) => {
    updateCartItemsReducer(addCartItem(cartItems, cartItem));
  };
  const subItemFromCart = (cartItem) => {
    updateCartItemsReducer(subCartItem(cartItems, cartItem));
  };
  const removeItemFromCart = (cartItem) => {
    updateCartItemsReducer(removeCartItem(cartItems, cartItem));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    total,
    setIsCartOpen,
    addItemToCart,
    subItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
