import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Compute cart totals
  const cart = {
    items: cartItems,
    itemCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
    total: cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    originalTotal: cartItems.reduce((sum, i) => sum + i.product.originalPrice * i.quantity, 0),
    savings: cartItems.reduce((sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity, 0),
  };

  const addToCart = useCallback((productId, productName, product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (existing) {
        showToast(`${productName} quantity updated!`);
        return prev.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // If product object passed directly, use it
      if (product) {
        showToast(`${productName} added to cart!`);
        return [...prev, { product, quantity: 1 }];
      }
      showToast(`${productName} added to cart!`);
      return prev;
    });
  }, []);

  // Version that accepts full product object (used by ProductCard via API)
  const addProductToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        showToast(`${product.name} quantity updated!`);
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      showToast(`${product.name} added to cart!`);
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => i.product.id === productId ? { ...i, quantity: newQty } : i)
      );
    }
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    showToast('Item removed from cart', 'error');
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const refreshCart = useCallback(() => {
    // No-op for local cart; kept for API compatibility
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      toast,
      addToCart,
      addProductToCart,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
