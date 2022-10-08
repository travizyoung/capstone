import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  subItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";

import { CheckoutItemContainer, ImageContainer } from "./checkout-item.styles";

function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, quantity, price } = cartItem;

  const handleCartItemAdd = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  };
  const handleCartItemSub = () => {
    dispatch(subItemFromCart(cartItems, cartItem));
  };
  const handleCartItemRemove = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={handleCartItemSub}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={handleCartItemAdd}>
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
