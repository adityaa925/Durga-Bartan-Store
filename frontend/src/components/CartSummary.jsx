import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSummary() {
  const { cart } = useCart();

  return (
    <div className="cart-summary" id="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>

      <div className="cart-summary__row">
        <span className="cart-summary__row--label">Subtotal ({cart.itemCount} items)</span>
        <span>₹{cart.originalTotal?.toLocaleString()}</span>
      </div>
      <div className="cart-summary__row cart-summary__row--savings">
        <span>Discount</span>
        <span>-₹{cart.savings?.toLocaleString()}</span>
      </div>
      <div className="cart-summary__row">
        <span className="cart-summary__row--label">Delivery</span>
        <span style={{ color: 'var(--success)', fontWeight: 600 }}>Calculated at checkout</span>
      </div>

      <div className="cart-summary__divider"></div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span className="cart-summary__total-value">₹{cart.total?.toLocaleString()}</span>
      </div>

      <div style={{
        padding: '8px 12px',
        background: 'rgba(230,81,0,0.06)',
        border: '1px solid rgba(230,81,0,0.2)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.78rem',
        color: 'var(--primary)',
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 'var(--space-md)',
      }}>
        💵 Cash on Delivery Available
      </div>

      <Link to="/checkout">
        <button className="btn-checkout" id="btn-checkout" disabled={cart.itemCount === 0}>
          Proceed to Checkout
          <ArrowRight size={18} />
        </button>
      </Link>

      <div style={{ marginTop: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        <ShieldCheck size={14} />
        Secure checkout · Free returns
      </div>
    </div>
  );
}
