import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <>
      <main className="cart-page container">
        <h1 className="cart-page__title">
          Shopping Cart
          <span className="cart-page__count">({cart.itemCount} items)</span>
        </h1>

        {cart.itemCount === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🛒</div>
            <h3 className="empty-state__title">Your cart is empty</h3>
            <p className="empty-state__text">Add some products to get started</p>
            <Link to="/" className="empty-state__btn">
              <ShoppingBag size={18} />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
