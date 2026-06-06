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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ height: 'auto', minHeight: 'var(--navbar-height)' }}>
      <div className="navbar__inner" style={{ flexWrap: 'wrap', gap: '8px', padding: '10px 24px' }}>

        {/* Row 1 — Brand + Phone + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Link to="/" className="navbar__brand">
            <img
              src="/logo.png"
              alt="Durga Bartan Store"
              style={{
                height: '48px', width: '48px',
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

          {/* Desktop Search */}
          <div className="navbar__search-desktop" style={{ flex: 1, maxWidth: 440, margin: '0 16px' }}>
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

        {/* Row 2 — Mobile Search */}
        <div className="navbar__search-mobile" style={{ width: '100%' }}>
          <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        </div>

        {/* Row 3 — Navigation Links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          width: '100%', borderTop: '1px solid var(--border)',
          paddingTop: 8, flexWrap: 'wrap',
        }}>
          {[
            { to: '/', label: '🏠 Home' },
            { to: '/brands', label: '🏷️ Brands' },
            { to: '/cart', label: '🛒 Cart' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'var(--transition-fast)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--bg-secondary)'; e.target.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-secondary)'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .navbar__phone-text { display: none; }
          .navbar__search-desktop { display: none !important; }
          .navbar__search-mobile { display: block !important; }
          .navbar__cart-btn { padding: 8px 12px; font-size: 0.8rem; }
        }
        @media (min-width: 769px) {
          .navbar__search-mobile { display: none !important; }
          .navbar__search-desktop { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
