const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// In-memory cart storage
let cart = [];

// GET /api/cart — Get current cart with product details
router.get('/', (req, res) => {
  const cartWithDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: product || null
    };
  }).filter(item => item.product !== null);

  const total = cartWithDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const originalTotal = cartWithDetails.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);

  res.json({
    items: cartWithDetails,
    itemCount: cartWithDetails.reduce((sum, item) => sum + item.quantity, 0),
    total,
    originalTotal,
    savings: originalTotal - total
  });
});

// POST /api/cart — Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.status(201).json({ message: 'Item added to cart', cart });
});

// PUT /api/cart/:productId — Update item quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const item = cart.find(i => i.productId === productId);
  if (!item) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  if (quantity <= 0) {
    cart = cart.filter(i => i.productId !== productId);
    return res.json({ message: 'Item removed from cart' });
  }

  item.quantity = quantity;
  res.json({ message: 'Cart updated', cart });
});

// DELETE /api/cart/:productId — Remove item from cart
router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const before = cart.length;
  cart = cart.filter(i => i.productId !== productId);

  if (cart.length === before) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  res.json({ message: 'Item removed from cart' });
});

// DELETE /api/cart — Clear entire cart
router.delete('/', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Export cart for use by orders route
module.exports = router;
module.exports.getCart = () => cart;
module.exports.clearCart = () => { cart = []; };
