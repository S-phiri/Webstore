import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import CartPanel from './components/CartPanel';
import Checkout from './components/Checkout';
import { supabase } from './supabaseClient';
import './Global.css';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      setUser(null);
    }
  };

  return (
    <>
      {/* Pass user and logout handler to Header */}
      <Header user={user} onLogout={handleLogout} />

      <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/products" element={<Products />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/checkout" element={<Checkout />} /> {/* ✅ NEW */}
</Routes>
      <CartPanel /> 
    </>
  );
}

export default App;
