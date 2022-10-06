import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { CheckoutItemContainer, ImageContainer } from "./checkout-item.styles";

function CheckoutItem({ cartItem }) {
  const { name, imageUrl, quantity, price } = cartItem;
  const { handleCartItemChange } = useContext(CartContext);

  const handleCartItemDecrease = () => {
    handleCartItemChange(cartItem, -1);
  };
  const handleCartItemIncrease = () => {
    handleCartItemChange(cartItem, 1);
  };
  const handleCartItemRemove = () => {
    handleCartItemChange(cartItem, 0);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={handleCartItemDecrease}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={handleCartItemIncrease}>
          &#10095;
        </div>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button" onClick={handleCartItemRemove}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
