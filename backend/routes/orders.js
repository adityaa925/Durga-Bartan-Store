const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products.json');
const { getCart, clearCart } = require('./cart');

// In-memory orders storage
const orders = [];

// POST /api/orders — Place an order from current cart
router.post('/', (req, res) => {
  const { customer } = req.body;

  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ error: 'Customer name, phone, and address are required' });
  }

  const cart = getCart();
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      subtotal: product.price * item.quantity
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = {
    id: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
    items: orderItems,
    customer,
    total,
    itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  clearCart();

  res.status(201).json(order);
});

// GET /api/orders/:id — Get order details
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

module.exports = router;
