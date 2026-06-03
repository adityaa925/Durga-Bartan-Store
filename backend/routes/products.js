const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/products — List all products, with optional filtering
router.get('/', (req, res) => {
  let result = [...products];
  const { category, search, tag } = req.query;

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.material.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  if (tag) {
    result = result.filter(p => p.tags.includes(tag));
  }

  res.json(result);
});

// GET /api/products/categories — List all categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  const categoryMeta = {
    cookware: { label: 'Cookware', icon: '🍳', description: 'Kadhai, Tawa, Pressure Cookers & more' },
    steel: { label: 'Steel Utensils', icon: '🥘', description: 'Thali, Glasses, Lunch Boxes & more' },
    glassware: { label: 'Glassware', icon: '🥂', description: 'Tumblers, Jugs, Bowls & more' },
    crockery: { label: 'Crockery Sets', icon: '🍽️', description: 'Dinner Sets, Mugs, Tea Sets & more' },
    cutlery: { label: 'Cutlery', icon: '🍴', description: 'Spoons, Knives, Forks & more' },
    decorative: { label: 'Decorative Items', icon: '🏺', description: 'Puja Thali, Copper Bottles, Vases & more' }
  };

  const result = categories.map(cat => ({
    id: cat,
    ...categoryMeta[cat],
    count: products.filter(p => p.category === cat).length
  }));

  res.json(result);
});

// GET /api/products/:id — Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
