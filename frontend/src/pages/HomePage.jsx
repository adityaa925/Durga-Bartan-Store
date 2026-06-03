import { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const CATEGORIES = [
  { id: 'cookware',   label: 'Cookware',       icon: '🍳' },
  { id: 'steel',      label: 'Steel Utensils',  icon: '🥘' },
  { id: 'glassware',  label: 'Glassware',       icon: '🥛' },
  { id: 'crockery',   label: 'Crockery',        icon: '🍽' },
  { id: 'cutlery',    label: 'Cutlery',         icon: '🍴' },
  { id: 'decorative', label: 'Decorative',      icon: '🪔' },
];
export default function HomePage({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : (data.products || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() =>
    CATEGORIES.map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.id).length,
    })),
    [products]
  );

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, activeCategory, searchTerm]);

  return (
    <>
      <HeroBanner />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <section className="products-section container" id="products">
        <div className="products-section__header">
          <h2 className="products-section__title">
            {activeCategory
              ? categories.find((c) => c.id === activeCategory)?.label
              : 'All Products'}
          </h2>
          <span className="products-section__count">{filtered.length} items</span>
        </div>

        {loading ? (
          <div className="loading"><div className="loading__spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <h3 className="empty-state__title">No products found</h3>
            <p className="empty-state__text">Try a different search or category</p>
            <button className="empty-state__btn" onClick={() => setActiveCategory(null)}>
              View All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
