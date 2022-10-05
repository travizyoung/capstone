import { createContext, useState, useEffect } from "react";

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

const changeCartItem = (cartItems, cartItem, operator) => {
  switch (operator) {
    case 1:
      return addCartItem(cartItems, cartItem);
    case -1:
      if (cartItem.quantity > 1) {
        return cartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return changeCartItem(cartItems, cartItem, 0);
      }
    case 0:
      return cartItems.filter((item) => item.id !== cartItem.id);
    default:
      return;
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // set new cart count
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);

    // set total
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const handleCartItemChange = (cartItem, operator) => {
    setCartItems(changeCartItem(cartItems, cartItem, operator));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    total,
    handleCartItemChange,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
