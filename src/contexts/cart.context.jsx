import { createContext, useState, useEffect, useReducer } from "react";

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

const getNewCount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const getNewTotal = (cartItems) => {
  return cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
};

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const CART_ACTION_TYPES = {
  TOGGLE_CART_IS_OPEN: "TOGGLE_CART_IS_OPEN",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  SUB_ITEM_FROM_CART: "SUB_ITEM_FROM_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  SET_NEW_COUNT: "SET_NEW_COUNT",
  SET_NEW_TOTAL: "SET_NEW_TOTAL",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.SUB_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: subCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.SET_NEW_COUNT:
      return {
        ...state,
        cartCount: getNewCount(state.cartItems),
      };
    case CART_ACTION_TYPES.SET_NEW_TOTAL:
      return {
        ...state,
        total: getNewTotal(state.cartItems),
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  total: 0,
  handleCartItemChange: () => {},
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, total } = state;

  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN });
  };
  const addItemToCart = (cartItem) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: cartItem });
  };
  const subItemFromCart = (cartItem) => {
    dispatch({ type: CART_ACTION_TYPES.SUB_ITEM_FROM_CART, payload: cartItem });
  };
  const removeItemFromCart = (cartItem) => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: cartItem,
    });
  };

  useEffect(() => {
    // set new cart count
    dispatch({ type: CART_ACTION_TYPES.SET_NEW_COUNT });

    // set total
    dispatch({ type: CART_ACTION_TYPES.SET_NEW_TOTAL });
  }, [cartItems]);

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
