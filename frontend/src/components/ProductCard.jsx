import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const categoryLabels = {
  cookware: 'Cookware',
  steel: 'Steel Utensils',
  glassware: 'Glassware',
  crockery: 'Crockery',
  cutlery: 'Cutlery',
  decorative: 'Decorative',
};

function StarRating({ rating }) {
  return (
    <div className="product-card__stars">
      {[1,2,3,4,5].map((i) => (
        <span key={i} className={`product-card__star ${i <= Math.round(rating) ? '' : 'product-card__star--empty'}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addProductToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation(); // prevent navigating when clicking Add
    addProductToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="product-card"
      id={`product-${product.id}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/F5F0EB/8B6914?text=${encodeURIComponent(product.name.slice(0,12))}`;
          }}
        />
        <div className="product-card__tags">
          {product.tags.map((tag) => (
            <span key={tag} className={`product-card__tag product-card__tag--${tag}`}>
              {tag}
            </span>
          ))}
        </div>
        {/* Multiple photos indicator */}
        {(product.image2 || product.image3 || product.image4) && (
          <div style={{
            position: 'absolute', bottom: 8, right: 8,
            background: 'rgba(0,0,0,0.6)', color: 'white',
            fontSize: '0.65rem', fontWeight: 600,
            padding: '3px 8px', borderRadius: 20,
          }}>
            📸 {[product.image, product.image2, product.image3, product.image4].filter(Boolean).length} photos
          </div>
        )}
      </div>
      <div className="product-card__body">
        <div className="product-card__category">
          {categoryLabels[product.category] || product.category}
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__meta">
          <span className="product-card__meta-badge">{product.material}</span>
          <span className="product-card__meta-badge">{product.size}</span>
        </div>
        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__review-count">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__current-price">₹{product.price.toLocaleString()}</span>
            <div>
              <span className="product-card__original-price">₹{product.originalPrice.toLocaleString()}</span>
              {' '}
              <span className="product-card__discount">{discount}% off</span>
            </div>
          </div>
          <button
            className={`btn-add-cart ${added ? 'added' : ''}`}
            onClick={handleAdd}
            id={`add-cart-${product.id}`}
          >
            {added ? <><Check size={16} /> Added</> : <><ShoppingCart size={16} /> Add</>}
          </button>
        </div>
      </div>
    </article>
  );
}
