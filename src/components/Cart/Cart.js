import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isUserCheckOut, getisUserCheckOut] = useState(false);
  const [didOrderSubmit, SetdidOrderSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;


  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const showCheckoutFormHandler = () => {
    getisUserCheckOut(true);
  };

  const orderSubmitHandler = (userData) => {
    console.log(cartCtx.items)
    console.log(userData)
    fetch('https://react-http-request-bfe69-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
     user:userData,
        orderItems: cartCtx.items.map((order) => order)
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(cartCtx)


    SetdidOrderSubmit(true);
    }

  const ModalAction = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    <button className={classes.button} onClick={showCheckoutFormHandler}>Order</button>
  </div>

  const ShowDetails = <React.Fragment>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div></React.Fragment>
  return (
    <Modal onClose={props.onClose}>
    
    {didOrderSubmit ?  <h2>Your order is confirm</h2> : <div>{ShowDetails}</div>}
      {isUserCheckOut && !didOrderSubmit && <Checkout onConfirm={orderSubmitHandler} onCancel={props.onClose} />}
      {!isUserCheckOut && !didOrderSubmit && ModalAction}
     
    </Modal>
  );
};

export default Cart;
