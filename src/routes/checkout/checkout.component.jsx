import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CheckoutContainer, Header, Total } from "./checkout.styles";

function Checkout() {
  const { cartItems, total } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <Header>
        <span className="header-block">Product</span>
        <span className="header-block">Description</span>
        <span className="header-block">Quantity</span>
        <span className="header-block">Price</span>
        <span className="header-block">Remove</span>
      </Header>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>TOTAL:${total}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
