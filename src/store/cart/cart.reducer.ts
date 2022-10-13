import { AnyAction } from "redux";
import { CartState } from "./cart.types";
import { setIsCartOpen, setCartItems } from "./cart.actions";

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state: CartState = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  return state;
};
