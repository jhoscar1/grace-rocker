const router = require('express').Router();
const Product = require('../db').model('product');
const gatekeeper = require('../utils/gatekeeper');

module.exports = router;

router.param('id', (req, res, next, id) => {
  Product.findById(id)
  .then(product => {
    if (!product) throw new Error('Product not found');
    req.product = product;
    next();
    return null;
  })
  .catch(next)
});

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', gatekeeper.isAdmin, (req, res, next) => {
  Product.create(req.body)
  .then(createdProduct => res.json(createdProduct))
  .catch(next)
});

router.get('/:id', (req, res, next) => {
  res.json(req.product);
})

router.put('/:id', gatekeeper.isAdmin, (req, res, next) => {
    return req.product.update(req.body)
    .then(savedProduct => res.json(savedProduct))
})

router.delete('/:id', gatekeeper.isAdmin, (req, res, next) => {
  req.product.destroy()
  .then(() => res.sendStatus(204))
});
