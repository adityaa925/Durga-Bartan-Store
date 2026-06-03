const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

// Helper to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Helper to save products
const saveProducts = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
};

// ── GET all products ──────────────────────────────────────
app.get('/api/products', (req, res) => {
  const products = readProducts();
  const { category, search } = req.query;
  let result = products;
  if (category) result = result.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );
  }
  res.json(result);
});

// ── GET single product ────────────────────────────────────
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ── POST add new product ──────────────────────────────────
app.post('/api/products', (req, res) => {
  const products = readProducts();
  const newProduct = {
    ...req.body,
    id: req.body.id || 'p' + Date.now(),
    inStock: req.body.inStock !== false,
    tags: req.body.tags || [],
    rating: req.body.rating || 4.5,
    reviewCount: req.body.reviewCount || 0,
  };
  products.push(newProduct);
  saveProducts(products);
  console.log(`✅ Product added: ${newProduct.name}`);
  res.json({ success: true, product: newProduct });
});

// ── PUT update product ────────────────────────────────────
app.put('/api/products/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  saveProducts(products);
  console.log(`✏️ Product updated: ${products[index].name}`);
  res.json({ success: true, product: products[index] });
});

// ── DELETE product ────────────────────────────────────────
app.delete('/api/products/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(index, 1)[0];
  saveProducts(products);
  console.log(`🗑️ Product deleted: ${deleted.name}`);
  res.json({ success: true });
});

// ── Orders ────────────────────────────────────────────────
const orders = [];

app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, city, pincode, items, total, shipping, notes } = req.body;
  if (!customerName || !phone || !items || !total) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }
  const order = {
    id: 'ORD-' + Date.now().toString().slice(-6),
    customerName, phone, address, city, pincode,
    items, total, shipping: shipping || 0,
    notes: notes || '',
    paymentMethod: 'Cash on Delivery',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  console.log(`\n📦 New Order: ${order.id} | ${customerName} | ₹${total} | COD`);
  res.json({ success: true, orderId: order.id, order });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'Durga Bartan Store',
    location: 'Mathana, Kurukshetra',
    contact: '7056328380',
    products: readProducts().length,
  });
});

app.listen(PORT, () => {
  console.log(`\n🪔 Durga Bartan Store API running at http://localhost:${PORT}`);
  console.log(`   📍 Mathana, Kurukshetra`);
  console.log(`   📞 7056328380`);
  console.log(`   🔧 Admin: http://localhost:5173/#/admin`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
