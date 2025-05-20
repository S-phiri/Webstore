import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../Redux/cart';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { setShippingMethod, toggleHelp } from '../Redux/shipping';

export default function Checkout() {
  const items = useSelector((state) => state.cart.items); // get all items from cart state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingMethod = useSelector((state) => state.shipping.method);
  const helpVisible = useSelector((state) => state.shipping.helpVisible);
  

  // calculate total from all cart items
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleConfirm = () => {
    alert('Thank you for your purchase!');
    dispatch(clearCart()); // clear cart state after confirming
    navigate('/'); // send user back to homepage
  };

  // if cart is empty, show this
  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} – R{item.price}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Total: R{total}</h3>
      <button onClick={handleConfirm}>Place Order</button>
      
      {/*Select options*/}
      <select
      value={shippingMethod}
      onChange={(e) => dispatch(setShippingMethod(e.target.value))}
      style={{ marginBottom: '1rem' }}
      >
      <option value="Standard">Standard (Free, 3–5 days)</option>
      <option value="Express">Express (R80, 1–2 days)</option>
      </select>

      {/*Toggle help button*/}
      <button
        onClick={() => dispatch(toggleHelp())}
        style={{
          padding: '6px 12px',
          background: 'maroon',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        Need help with shipping?
      </button>

      {helpVisible && (
        <div style={{
          backgroundColor: '#f1f1f1',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <p><strong>Standard:</strong> Free delivery in 3–5 working days.</p>
          <p><strong>Express:</strong> R80 for next-day delivery (1–2 days).</p>
        </div>
      )}

    </div>
    
  );
}
