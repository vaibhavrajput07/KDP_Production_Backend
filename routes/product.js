// backend/routes/product.js
const express = require('express');
const Product = require('../models/Product');
const { isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', isAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

router.put('/:id', isAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;


