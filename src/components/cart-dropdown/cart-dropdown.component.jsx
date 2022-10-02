import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button style={{ padding: 0 }}>Go TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
