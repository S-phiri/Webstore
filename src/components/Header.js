import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css'; 
import '../Global.css'; 

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  // Handles navigation to given category
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <header className="main-header">
      {/* Clickable logo */}
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🛒 Selects</h1>

      <nav>
        <button className="button" onClick={() => handleCategoryClick('men')}>Men</button>
        <button className="button" onClick={() => handleCategoryClick('women')}>Women</button>

        {user ? (
          <>
            <span className="welcome-text">Hi, {user.user_metadata?.username || user.email}</span>
            <Link to="/cart">Cart ({items.length})</Link>
            <button className="button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
