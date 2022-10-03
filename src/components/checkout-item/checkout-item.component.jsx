import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
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
    </div>
  );
}

export default CheckoutItem;
