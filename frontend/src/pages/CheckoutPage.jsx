import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const SHIPPING_RULES = [
  { label: 'Within Mathana / Same Village', charge: 0 },
  { label: 'Nearby area (up to 10 km from Mathana)', charge: 0 },
  { label: 'Kurukshetra city & surroundings (10–30 km)', charge: 50 },
  { label: 'Other districts / Far areas (30+ km)', charge: 100 },
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '', notes: '' });
  const [shippingIndex, setShippingIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = SHIPPING_RULES[shippingIndex];
  const grandTotal = (cart.total || 0) + shipping.charge;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) e.phone = 'Valid 10-digit phone required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City/Village is required';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const buildWhatsAppMessage = () => {
    const items = (cart.items || [])
      .map((i) => `  • ${i.product.name} x${i.quantity} = \u20b9${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');
    return encodeURIComponent(
      `\uD83D\uDED2 *NEW ORDER \u2014 Durga Bartan Store*\n\n` +
      `\uD83D\uDC64 *Customer:* ${form.name}\n` +
      `\uD83D\uDCDE *Phone:* ${form.phone}\n` +
      `\uD83D\uDCCD *Address:* ${form.address}, ${form.city}${form.pincode ? ' - ' + form.pincode : ''}\n\n` +
      `\uD83E\uDDFE *Items Ordered:*\n${items}\n\n` +
      `\uD83D\uDCB0 *Subtotal:* \u20b9${(cart.total || 0).toLocaleString()}\n` +
      `\uD83D\uDE9A *Shipping:* ${shipping.charge === 0 ? 'FREE' : '\u20b9' + shipping.charge} (${shipping.label})\n` +
      `\u2705 *Grand Total:* \u20b9${grandTotal.toLocaleString()}\n\n` +
      `\uD83D\uDCB5 *Payment:* Cash on Delivery\n` +
      (form.notes ? `\uD83D\uDCDD *Notes:* ${form.notes}\n` : '') +
      `\n_Please confirm this order. Thank you!_`
    );
  };

  const handlePlaceOrder = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    window.open(`https://wa.me/917056328380?text=${buildWhatsAppMessage()}`, '_blank');
    setTimeout(() => {
      if (clearCart) clearCart();
      navigate(`/order/${orderId}`, {
        state: {
          customerName: form.name,
          items: cart.items,
          total: grandTotal,
          shipping: shipping.charge,
          phone: form.phone,
          address: `${form.address}, ${form.city}`,
        },
      });
      setLoading(false);
    }, 800);
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div style={{ paddingTop: 140, textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <main className="checkout-page container">
        <h1 className="checkout-page__title">Checkout</h1>
        <div className="checkout-layout">

          {/* LEFT — Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

            {/* Delivery Details */}
            <div className="checkout-form">
              <h2 className="checkout-form__title">📦 Delivery Details</h2>
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                {errors.name && <span style={{ color: 'var(--error)', fontSize: '0.78rem' }}>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} />
                {errors.phone && <span style={{ color: 'var(--error)', fontSize: '0.78rem' }}>{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Full Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="House no., Street, Mohalla..." rows={3} />
                {errors.address && <span style={{ color: 'var(--error)', fontSize: '0.78rem' }}>{errors.address}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label>City / Village *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Kurukshetra" />
                  {errors.city && <span style={{ color: 'var(--error)', fontSize: '0.78rem' }}>{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="136000" maxLength={6} />
                </div>
              </div>
              <div className="form-group">
                <label>Special Instructions (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special instructions..." rows={2} />
              </div>
            </div>

            {/* Shipping Distance */}
            <div className="checkout-form">
              <h2 className="checkout-form__title">
                <MapPin size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                Shipping Distance
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                Select your approximate distance from <strong>Mathana, Kurukshetra</strong>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SHIPPING_RULES.map((rule, i) => (
                  <label key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${shippingIndex === i ? 'var(--primary)' : 'var(--border)'}`,
                    background: shippingIndex === i ? 'rgba(230,81,0,0.06)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-base)',
                  }}>
                    <input type="radio" name="shipping" checked={shippingIndex === i} onChange={() => setShippingIndex(i)} style={{ accentColor: 'var(--primary)' }} />
                    <span style={{ flex: 1, fontSize: '0.9rem' }}>{rule.label}</span>
                    <span style={{ fontWeight: 700, color: rule.charge === 0 ? 'var(--success)' : 'var(--primary)', fontSize: '0.95rem' }}>
                      {rule.charge === 0 ? 'FREE' : `\u20b9${rule.charge}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-form">
              <h2 className="checkout-form__title">💵 Payment Method</h2>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--primary)',
                background: 'rgba(230,81,0,0.06)',
              }}>
                <span style={{ fontSize: '2rem' }}>💵</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Pay ₹{grandTotal.toLocaleString()} when your order arrives at your door
                  </div>
                </div>
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--success)', color: 'white',
                  fontSize: '0.7rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: 'var(--radius-full)',
                }}>✓ SELECTED</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div>
            <div className="cart-summary" style={{ position: 'sticky', top: 100 }}>
              <h3 className="cart-summary__title">Order Summary</h3>
              <div style={{ marginBottom: 'var(--space-md)', maxHeight: 200, overflowY: 'auto' }}>
                {(cart.items || []).map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-secondary)', flex: 1, marginRight: 8 }}>{item.product.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="cart-summary__row">
                <span className="cart-summary__row--label">Subtotal</span>
                <span>₹{(cart.total || 0).toLocaleString()}</span>
              </div>
              {cart.savings > 0 && (
                <div className="cart-summary__row cart-summary__row--savings">
                  <span>You Save</span>
                  <span>-₹{cart.savings?.toLocaleString()}</span>
                </div>
              )}
              <div className="cart-summary__row">
                <span className="cart-summary__row--label">
                  <Truck size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  Shipping
                </span>
                <span style={{ color: shipping.charge === 0 ? 'var(--success)' : 'var(--text-primary)', fontWeight: 600 }}>
                  {shipping.charge === 0 ? 'FREE' : `₹${shipping.charge}`}
                </span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__total">
                <span>Grand Total</span>
                <span className="cart-summary__total-value">₹{grandTotal.toLocaleString()}</span>
              </div>

              <div style={{
                padding: '10px 14px',
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.3)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem', color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <MessageCircle size={16} color="#25D366" />
                Order details sent to owner via <strong style={{ color: '#25D366' }}>WhatsApp</strong>
              </div>

              <button className="btn-place-order" onClick={handlePlaceOrder} disabled={loading} id="btn-place-order">
                {loading ? '⏳ Placing Order...' : '✅ Place Order — Cash on Delivery'}
              </button>

              <div style={{ marginTop: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <ShieldCheck size={14} />
                100% Safe · No Advance Payment · COD
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
