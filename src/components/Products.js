import { useEffect, useState } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { useLocation } from 'react-router-dom'; 
import { useUser } from '@supabase/auth-helpers-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cart';
import { toggleCartPanel } from '../Redux/uiSlice';
import Loading from './Loading'; 

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useUser();

  // get selected category from the query string (e.g. ?category=nike)
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  // called when user clicks Buy button
  const handleBuy = (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    dispatch(addToCart(product)); // add product to cart state
    dispatch(toggleCartPanel(true)); // optional: open cart panel
  };

  // runs when component loads or category changes
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');
      if (selectedCategory) {
        query = query.eq('category', selectedCategory); // filter by category if present
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Products {selectedCategory ? `- ${selectedCategory}` : ''}</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                width: '250px',
                position: 'relative',
              }}
            >
              {/* badge for product rating (optional visual element) */}
              <span style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#FFD700',
                color: '#000',
                padding: '2px 6px',
                fontSize: '0.8rem',
                borderRadius: '4px'
              }}>
                ★ 4.5
              </span>

              <img
                src={product.image_url}
                alt={product.name}
                width="100%"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <h3>{product.name}</h3>
              <p><strong>R{product.price}</strong></p>
              <p>{product.description}</p>
              <button
                onClick={() => handleBuy(product)}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#111827',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
