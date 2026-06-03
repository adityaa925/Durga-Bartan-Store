import { useLocation, useParams, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { state } = useLocation();

  const customerName = state?.customerName || 'Customer';
  const items = state?.items || [];
  const total = state?.total || 0;
  const shipping = state?.shipping || 0;
  const address = state?.address || '';
  const phone = state?.phone || '';

  return (
    <>
      <main className="order-success">
        <div className="order-success__icon">✅</div>
        <h1 className="order-success__title">Order Placed Successfully!</h1>
        <p className="order-success__subtitle">
          Thank you, <strong>{customerName}</strong>! Your order has been received.
        </p>

        {/* WhatsApp notice */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 20px',
          background: 'rgba(37,211,102,0.1)',
          border: '1px solid rgba(37,211,102,0.4)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-xl)',
          maxWidth: 480,
          width: '100%',
        }}>
          <MessageCircle size={20} color="#25D366" />
          <div style={{ fontSize: '0.88rem' }}>
            <strong style={{ color: '#25D366' }}>WhatsApp sent!</strong> The store owner has received your order details. They will call or WhatsApp you shortly to confirm delivery.
          </div>
        </div>

        {/* Order card */}
        <div className="order-success__card">
          <div className="order-success__order-id">Order ID: {orderId}</div>

          {items.length > 0 && (
            <ul className="order-success__items">
              {items.map((item) => (
                <li key={item.product.id}>
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
              {shipping > 0 && (
                <li>
                  <span>🚚 Shipping</span>
                  <span>₹{shipping}</span>
                </li>
              )}
            </ul>
          )}

          <div className="order-success__total">
            <span>Total to Pay on Delivery</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          {/* Delivery info */}
          {(address || phone) && (
            <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {phone && <div style={{ display: 'flex', gap: 8 }}><Phone size={14} style={{ marginTop: 2, flexShrink: 0 }} /><span>{phone}</span></div>}
              {address && <div style={{ display: 'flex', gap: 8 }}><MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} /><span>{address}</span></div>}
            </div>
          )}

          {/* COD badge */}
          <div style={{
            marginTop: 'var(--space-md)',
            padding: '8px 14px',
            background: 'rgba(230,81,0,0.08)',
            border: '1px solid rgba(230,81,0,0.2)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--primary)',
            fontWeight: 600,
            textAlign: 'center',
          }}>
            💵 Cash on Delivery — Pay when your order arrives
          </div>
        </div>

        {/* Contact store */}
        <div style={{
          marginTop: 'var(--space-xl)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Need help? Contact the store directly:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:7056328380" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem', color: 'var(--text-primary)',
              fontWeight: 600,
            }}>
              <Phone size={16} /> 70563 28380
            </a>
            <a href="https://wa.me/917056328380" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: '#25D366',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem', color: 'white',
              fontWeight: 600,
            }}>
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        <Link to="/">
          <button className="btn-continue" style={{ marginTop: 'var(--space-xl)' }}>
            ← Continue Shopping
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
