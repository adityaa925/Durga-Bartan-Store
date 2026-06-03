import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Navbar({ searchTerm, onSearch }) {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <img
            src="/logo.png"
            alt="Durga Bartan Store"
            style={{
              height: '54px', width: '54px',
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          />
          <div>
            <div className="navbar__title">Durga Bartan Store</div>
            <div className="navbar__subtitle">Mathana, Kurukshetra</div>
          </div>
        </Link>

        {/* Search Bar with suggestions */}
        <div className="navbar__search" style={{ padding: 0, background: 'none', border: 'none' }}>
          <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        </div>

        <div className="navbar__actions">
          <a href="tel:7056328380" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.8rem', color: 'var(--text-secondary)',
            padding: '6px 10px', textDecoration: 'none',
          }}>
            <Phone size={15} />
            <span className="navbar__phone-text">70563 28380</span>
          </a>
          <Link to="/cart">
            <button className="navbar__cart-btn" id="cart-button">
              <ShoppingCart size={18} />
              Cart
              {cart.itemCount > 0 && (
                <span className="navbar__cart-badge">{cart.itemCount}</span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
