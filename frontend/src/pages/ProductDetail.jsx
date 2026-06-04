import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const categoryLabels = {
  cookware: 'Cookware',
  steel: 'Steel Utensils',
  glassware: 'Glassware',
  crockery: 'Crockery',
  cutlery: 'Cutlery',
  decorative: 'Decorative',
};

function SimilarProducts({ currentId, category }) {
  const [similar, setSimilar] = useState([]);
  const { addProductToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://durga-bartan-store-backend.onrender.comhttps://durga-bartan-store-backend.onrender.com/api/products?category=' + category)
      .then(r => r.json())
      .then(data => setSimilar(data.filter(p => p.id !== currentId).slice(0, 4)))
      .catch(() => {});
  }, [currentId, category]);

  if (similar.length === 0) return null;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>
        Similar Products
      </h2>
      <div className="products-grid">
        {similar.map(p => (
          <article
            key={p.id}
            className="product-card"
            onClick={() => { navigate('/product/' + p.id); window.scrollTo(0,0); }}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-card__image-wrap">
              <img
                className="product-card__image"
                src={p.image}
                alt={p.name}
                onError={e => { e.target.src = 'https://placehold.co/400x300?text=No+Image'; }}
              />
              <div className="product-card__tags">
                {(p.tags || []).map(tag => (
                  <span key={tag} className={'product-card__tag product-card__tag--' + tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="product-card__body">
              <div className="product-card__category">{categoryLabels[p.category] || p.category}</div>
              <h3 className="product-card__name">{p.name}</h3>
              <div className="product-card__footer">
                <div className="product-card__price">
                  <span className="product-card__current-price">₹{p.price?.toLocaleString()}</span>
                  {p.originalPrice > p.price && (
                    <span className="product-card__original-price">₹{p.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                <button
                  className="btn-add-cart"
                  onClick={e => { e.stopPropagation(); addProductToCart(p); }}
                >
                  <ShoppingCart size={14} /> Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
  fetch(`https://durga-bartan-store-backend.onrender.comhttps://durga-bartan-store-backend.onrender.com/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="loading" style={{ paddingTop: 120 }}>
      <div className="loading__spinner" />
    </div>
  );

  if (!product) return (
    <div style={{ paddingTop: 120, textAlign: 'center' }}>
      <p>Product not found.</p>
      <Link to="/" style={{ color: 'var(--primary)' }}>Back to Home</Link>
    </div>
  );

  const images = [product.image, product.image2, product.image3, product.image4].filter(Boolean);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addProductToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <main style={{ paddingTop: 'calc(var(--navbar-height) + 24px)', paddingBottom: 40, minHeight: '100vh' }}>
        <div className="container">

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigate('/')}>
              {categoryLabels[product.category]}
            </span>
            <span>›</span>
            <span>{product.name}</span>
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

            {/* LEFT — Images */}
            <div style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 24px)' }}>
              {/* Main Image */}
              <div style={{
                background: 'linear-gradient(135deg, #F5F0EB, #EDE5DA)',
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--border)',
                marginBottom: 12,
                aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s ease' }}
                  onError={e => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 72, height: 72,
                        borderRadius: 10, overflow: 'hidden',
                        border: '2.5px solid ' + (activeImage === i ? 'var(--primary)' : 'var(--border)'),
                        background: '#F5F0EB',
                        cursor: 'pointer', padding: 0,
                        transition: '0.2s',
                      }}
                    >
                      <img
                        src={img}
                        alt={'View ' + (i + 1)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = 'https://placehold.co/72x72?text=Img'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Info */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
                {categoryLabels[product.category]}
              </div>

              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.3, fontFamily: 'Outfit, sans-serif' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'var(--success)', color: 'white',
                  padding: '3px 10px', borderRadius: 6,
                  fontSize: '0.85rem', fontWeight: 700,
                }}>
                  {product.rating} <Star size={12} fill="white" />
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {product.reviewCount} reviews
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 20, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif' }}>
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice?.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '1rem', color: 'var(--success)', fontWeight: 700 }}>
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Inclusive of all taxes</p>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                <span style={{ padding: '6px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  📦 {product.material}
                </span>
                <span style={{ padding: '6px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  📐 {product.size}
                </span>
                <span style={{ padding: '6px 14px', background: product.inStock ? 'var(--success-bg)' : 'var(--error-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: product.inStock ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Description</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {product.description}
                  </p>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                style={{
                  width: '100%', padding: '16px',
                  background: added
                    ? 'linear-gradient(135deg, var(--success), #1B5E20)'
                    : !product.inStock ? '#ccc'
                    : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  color: 'white', border: 'none', borderRadius: 'var(--radius-md)',
                  fontSize: '1.05rem', fontWeight: 600,
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: '0.2s', boxShadow: 'var(--shadow-md)', marginBottom: 12,
                }}
              >
                {added ? <><Check size={20} /> Added to Cart!</> : <><ShoppingCart size={20} /> Add to Cart</>}
              </button>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 20 }}>
                {[
                  { icon: <Truck size={18} />, title: 'Fast Delivery', sub: 'Mathana & nearby' },
                  { icon: <Shield size={18} />, title: '100% Safe', sub: 'Cash on Delivery' },
                  { icon: <RefreshCw size={18} />, title: '7 Day Return', sub: 'Easy returns' },
                ].map((badge, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 4, padding: '12px 8px',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', textAlign: 'center',
                  }}>
                    <span style={{ color: 'var(--primary)' }}>{badge.icon}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{badge.title}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{badge.sub}</span>
                  </div>
                ))}
              </div>

              {/* Store info */}
              <div style={{
                marginTop: 20, padding: '14px 16px',
                background: 'rgba(230,81,0,0.05)',
                border: '1px solid rgba(230,81,0,0.15)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem', color: 'var(--text-secondary)',
              }}>
                <strong>📍 Durga Bartan Store</strong> — Mathana, Kurukshetra, In front of Mathana Bus Stand
                <br />
                <a href="tel:7056328380" style={{ color: 'var(--primary)', fontWeight: 600 }}>📞 70563 28380</a>
                {' · '}
                <a href="https://wa.me/917056328380" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts currentId={product.id} category={product.category} />

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
