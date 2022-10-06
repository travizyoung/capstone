import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const toCheckoutPage = () => {
    navigate("checkout");
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty now.</EmptyMessage>
        )}
      </CartItems>

      <Button style={{ padding: 0 }} onClick={toCheckoutPage}>
        Go TO CHECKOUT
      </Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
