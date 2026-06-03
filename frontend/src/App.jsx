import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminApp from './pages/AdminApp';
import ProductDetail from './pages/ProductDetail';

function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className={`toast toast--${toast.type}`}>
      {toast.type === 'success' ? '✓' : '✕'} {toast.message}
    </div>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { refreshCart } = useCart();

  useEffect(() => {
    if (refreshCart) refreshCart();
  }, [refreshCart]);

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <Toast />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/*" element={
          <CartProvider>
            <AppContent />
          </CartProvider>
        } />
      </Routes>
    </Router>
  );
}
