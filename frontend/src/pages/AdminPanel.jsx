import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LogOut, Package, Save, X, Eye, EyeOff, ShoppingBag, Star } from 'lucide-react';

const CATEGORIES = [
  { id: 'cookware', label: 'Cookware' },
  { id: 'steel', label: 'Steel Utensils' },
  { id: 'glassware', label: 'Glassware' },
  { id: 'crockery', label: 'Crockery' },
  { id: 'cutlery', label: 'Cutlery' },
  { id: 'decorative', label: 'Decorative' },
];

const EMPTY_PRODUCT = {
  id: '',
  name: '',
  category: 'cookware',
  material: '',
  size: '',
  price: '',
  originalPrice: '',
  rating: 4.5,
  reviewCount: 0,
  image: '',
  description: '',
  inStock: true,
  tags: [],
};

export default function AdminPanel({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://durga-bartan-store-backend.onrender.com/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      showToast('Could not load products', 'error');
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({ ...product });
    setPreviewImage(product.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = () => {
    setEditProduct(null);
    setForm({ ...EMPTY_PRODUCT, id: 'p' + Date.now() });
    setPreviewImage('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) {
      showToast('Name, Price and Image are required!', 'error');
      return;
    }
    setSaving(true);
    try {
      const method = editProduct ? 'PUT' : 'POST';
      const url = editProduct ? `https://durga-bartan-store-backend.onrender.com/api/products/${form.id}` : 'https://durga-bartan-store-backend.onrender.com/api/products';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice) || Number(form.price),
          rating: Number(form.rating),
          reviewCount: Number(form.reviewCount),
        }),
      });
      if (res.ok) {
        showToast(editProduct ? '✅ Product updated!' : '✅ Product added!');
        setShowForm(false);
        fetchProducts();
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://durga-bartan-store-backend.onrender.com/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('🗑️ Product deleted!');
        setProducts(products.filter(p => p.id !== id));
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
    setDeleteConfirm(null);
  };

  const toggleTag = (tag) => {
    const tags = form.tags.includes(tag)
      ? form.tags.filter(t => t !== tag)
      : [...form.tags, tag];
    setForm({ ...form, tags });
  };

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #E8D5C0', borderRadius: 10,
    fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
    outline: 'none', background: '#FFF8F0',
    color: '#1A1207',
  };

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: '#5C4A32', marginBottom: 4,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8F0', fontFamily: 'Inter, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          padding: '12px 20px', borderRadius: 10,
          background: toast.type === 'error' ? '#C62828' : '#2E7D32',
          color: 'white', fontWeight: 600, fontSize: '0.875rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          animation: 'slideIn 0.3s ease',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, maxWidth: 380, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🗑️</div>
            <h3 style={{ marginBottom: 8 }}>Delete Product?</h3>
            <p style={{ color: '#8B7355', fontSize: '0.9rem', marginBottom: 24 }}>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #E8D5C0', background: 'white', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#C62828', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00, #3E1500)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ color: '#FFB300', fontWeight: 700, fontSize: '1.1rem' }}>Admin Panel</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>Durga Bartan Store</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: 'rgba(255,255,255,0.1)', color: 'white',
            fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none',
          }}>
            <Eye size={14} /> View Store
          </a>
          <button onClick={onLogout} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: 'rgba(255,255,255,0.1)', color: 'white',
            border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
          }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Total Products', value: products.length, icon: '📦', color: '#E65100' },
            { label: 'In Stock', value: products.filter(p => p.inStock).length, icon: '✅', color: '#2E7D32' },
            { label: 'Out of Stock', value: products.filter(p => !p.inStock).length, icon: '❌', color: '#C62828' },
            { label: 'Categories', value: CATEGORIES.length, icon: '🗂️', color: '#1565C0' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 12, padding: '16px 20px',
              border: '1px solid #F0E0D0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#8B7355' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div style={{
            background: 'white', borderRadius: 16, padding: 24,
            border: '1px solid #F0E0D0', marginBottom: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.2rem', color: '#E65100' }}>
                {editProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              {/* Name */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Heavy Gauge Stainless Steel Kadhai" />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              {/* Material */}
              <div>
                <label style={labelStyle}>Material</label>
                <input style={inputStyle} value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} placeholder="e.g. Stainless Steel" />
              </div>

              {/* Size */}
              <div>
                <label style={labelStyle}>Size</label>
                <input style={inputStyle} value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="e.g. 28cm or Set of 6" />
              </div>

              {/* Price */}
              <div>
                <label style={labelStyle}>Selling Price (₹) *</label>
                <input style={inputStyle} type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="899" />
              </div>

              {/* Original Price */}
              <div>
                <label style={labelStyle}>Original Price (₹) — for discount</label>
                <input style={inputStyle} type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="1299" />
              </div>

              {/* Image URLs — 4 photos */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>📸 Product Photos (paste image URLs from Google)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { key: 'image', label: 'Photo 1 (Main) *' },
                    { key: 'image2', label: 'Photo 2' },
                    { key: 'image3', label: 'Photo 3' },
                    { key: 'image4', label: 'Photo 4' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label style={{ ...labelStyle, textTransform: 'none', fontSize: '0.72rem' }}>{label}</label>
                      <input
                        style={inputStyle}
                        value={form[key] || ''}
                        onChange={e => {
                          setForm({ ...form, [key]: e.target.value });
                          if (key === 'image') setPreviewImage(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Previews */}
              {[form.image, form.image2, form.image3, form.image4].some(Boolean) && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Image Previews</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[form.image, form.image2, form.image3, form.image4].filter(Boolean).map((img, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img
                          src={img}
                          alt={`Preview ${i + 1}`}
                          style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid #F0E0D0' }}
                          onError={e => e.target.style.display = 'none'}
                        />
                        <span style={{
                          position: 'absolute', bottom: 4, left: 4,
                          background: 'rgba(0,0,0,0.6)', color: 'white',
                          fontSize: '0.6rem', padding: '1px 5px', borderRadius: 4,
                        }}>Photo {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product..."
                />
              </div>

              {/* Tags */}
              <div>
                <label style={labelStyle}>Tags</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['bestseller', 'new', 'premium'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      style={{
                        padding: '6px 14px', borderRadius: 20,
                        border: `2px solid ${form.tags.includes(tag) ? '#E65100' : '#E8D5C0'}`,
                        background: form.tags.includes(tag) ? '#E65100' : 'white',
                        color: form.tags.includes(tag) ? 'white' : '#5C4A32',
                        cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label style={labelStyle}>Stock Status</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[true, false].map(val => (
                    <button
                      key={String(val)}
                      onClick={() => setForm({ ...form, inStock: val })}
                      style={{
                        padding: '8px 20px', borderRadius: 8,
                        border: `2px solid ${form.inStock === val ? (val ? '#2E7D32' : '#C62828') : '#E8D5C0'}`,
                        background: form.inStock === val ? (val ? '#E8F5E9' : '#FFEBEE') : 'white',
                        color: form.inStock === val ? (val ? '#2E7D32' : '#C62828') : '#8B7355',
                        cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                      }}
                    >
                      {val ? '✅ In Stock' : '❌ Out of Stock'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 10,
                  background: saving ? '#ccc' : 'linear-gradient(135deg, #E65100, #AC1900)',
                  color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '0.95rem',
                }}
              >
                <Save size={16} />
                {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: '12px 24px', borderRadius: 10,
                  border: '1.5px solid #E8D5C0', background: 'white',
                  cursor: 'pointer', fontWeight: 600, color: '#5C4A32',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products List Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, marginBottom: 16,
        }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1A1207' }}>
            Products <span style={{ color: '#8B7355', fontWeight: 400, fontSize: '0.9rem' }}>({filtered.length})</span>
          </h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, width: 200, padding: '8px 14px' }}
            />
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value)}
              style={{ ...inputStyle, width: 160, padding: '8px 14px' }}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <button
              onClick={handleAdd}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 10,
                background: 'linear-gradient(135deg, #E65100, #AC1900)',
                color: 'white', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.875rem',
                whiteSpace: 'nowrap',
              }}
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8B7355' }}>Loading products...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8B7355' }}>No products found</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {filtered.map(product => (
              <div key={product.id} style={{
                background: 'white', borderRadius: 14, overflow: 'hidden',
                border: '1px solid #F0E0D0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: '0.2s',
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://placehold.co/400x300?text=No+Image'; }}
                  />
                  <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {product.tags?.map(tag => (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: 20, fontSize: '0.65rem',
                        fontWeight: 700, textTransform: 'uppercase',
                        background: tag === 'bestseller' ? '#FFB300' : tag === 'new' ? '#2E7D32' : '#7C3AED',
                        color: tag === 'bestseller' ? '#1A1207' : 'white',
                      }}>{tag}</span>
                    ))}
                  </div>
                  {!product.inStock && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8,
                      background: '#C62828', color: 'white',
                      padding: '2px 8px', borderRadius: 20,
                      fontSize: '0.65rem', fontWeight: 700,
                    }}>OUT OF STOCK</div>
                  )}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.65rem', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 2 }}>
                    {CATEGORIES.find(c => c.id === product.category)?.label}
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4, lineHeight: 1.3, color: '#1A1207' }}>
                    {product.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#8B7355', marginBottom: 8 }}>
                    {product.material} · {product.size}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E65100' }}>₹{product.price?.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span style={{ fontSize: '0.75rem', color: '#8B7355', textDecoration: 'line-through', marginLeft: 6 }}>₹{product.originalPrice?.toLocaleString()}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleEdit(product)}
                        style={{
                          padding: '6px 12px', borderRadius: 8,
                          border: '1.5px solid #E65100', background: 'white',
                          color: '#E65100', cursor: 'pointer', fontWeight: 600,
                          fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4,
                        }}
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product)}
                        style={{
                          padding: '6px 12px', borderRadius: 8,
                          border: '1.5px solid #C62828', background: 'white',
                          color: '#C62828', cursor: 'pointer', fontWeight: 600,
                          fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4,
                        }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
