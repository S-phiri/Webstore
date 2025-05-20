import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Redux/cart';
import { useUser } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import './CartPanel.css';

export default function CartPanel() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const isOpen = true; 
  const setIsOpen = () => {};

  const user = useUser();
  const navigate = useNavigate();

  // Calculate the total
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // when length of items state is 0, return null
  if (!isOpen || items.length === 0) return null;

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h3>Cart 🛍️</h3>
        <button onClick={() => setIsOpen(false)}>✖</button>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>R{item.price}</span>
              <button onClick={() => dispatch(removeFromCart(index))
              }>Remove</button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <strong>Total: R{total}</strong>
          </div>
          
          {/*Dependent on whether there is a user or not*/}

          <button
            className="checkout-btn"
            onClick={() => {
              setIsOpen(false);
              user ? navigate('/checkout') : navigate('/login');
            }}
          >
            {user ? "Go to Checkout" : "Login to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
