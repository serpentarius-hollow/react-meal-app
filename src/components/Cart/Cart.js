import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const hasItems = cartContext.items.length > 0;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
