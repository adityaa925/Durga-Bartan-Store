import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="cart-item" id={`cart-item-${product.id}`}>
      <img
        className="cart-item__image"
        src={product.image}
        alt={product.name}
        onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=No+Image'; }}
      />
      <div className="cart-item__info">
        <div>
          <h3 className="cart-item__name">{product.name}</h3>
          <p className="cart-item__meta">{product.material} · {product.size}</p>
        </div>
        <div className="cart-item__actions">
          <div className="cart-item__qty">
            <button
              className="cart-item__qty-btn"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              id={`qty-minus-${product.id}`}
            >
              <Minus size={16} />
            </button>
            <span className="cart-item__qty-value">{quantity}</span>
            <button
              className="cart-item__qty-btn"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              id={`qty-plus-${product.id}`}
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="cart-item__price">₹{(product.price * quantity).toLocaleString()}</span>
          <button
            className="cart-item__remove"
            onClick={() => removeItem(product.id)}
            id={`remove-${product.id}`}
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
