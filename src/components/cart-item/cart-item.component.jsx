import { CartItemContainer, ItemDetail } from "./cart-item.styles";

function CartItem({ cartItem: { name, quantity, imageUrl, price } }) {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetail>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetail>
    </CartItemContainer>
  );
}

export default CartItem;
