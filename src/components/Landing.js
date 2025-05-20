import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  // Initialise the Navigation function
  const navigate = useNavigate();

  // Enables Navigation to product page, men or women
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Simba Selects 🛍️</h1>
      <p className="tagline">Shop curated finds for Men and Women</p>

      <div className="category-grid">
        <div className="category-card" onClick={() => handleCategoryClick('men')}>
          <h2>Men</h2>
        </div>
        <div className="category-card" onClick={() => handleCategoryClick('women')}>
          <h2>Women</h2>
        </div>
      </div>
    </div>
  );
}

export default Landing;

