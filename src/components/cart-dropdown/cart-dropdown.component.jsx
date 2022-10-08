import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setIsCartOpen } from "../../store/cart/cart.actions";
import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();
  const toCheckoutPage = () => {
    navigate("checkout");
    dispatch(setIsCartOpen(!isCartOpen));
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
