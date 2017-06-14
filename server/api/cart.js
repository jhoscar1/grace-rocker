const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product');
const ProductOrder = require('../db').model('product_order');
const gatekeeper = require('../utils/gatekeeper');

module.exports = router;

const findOrCreateCartByCookie = (req, res, next) => {
  return Order.findOrCreate({
    where: {
      status: 'created',
      id: req.session.order
    },
    include: [Product]
  })
  .spread((order) => {
    req.session.order = order.id;
    return order;
  })
  .then(order => {
    res.json(order);
  })
  .catch(next);
}

const findOrCreateCartByUser = (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: 'created',
      userId: req.user.id
    },
    include: [Product]
  })
  .spread((order) => {
    req.session.order = order.id;
    return order;
  })
  .then((order) => {
    return order.setUser(req.user)
    .then(setOrder => {
      res.json(setOrder);
      return null;
    })
  })
  .catch(next);
}

router.get('/', (req, res, next) => {
  if (req.user) {
    findOrCreateCartByUser(req, res, next)
  }
  else {
    findOrCreateCartByCookie(req, res, next);
  }
});

router.get('/', (req, res, next) => {
  if (req.user) {
    findOrCreateCartByUser(req, res, next)
  }
  else {
    findOrCreateCartByCookie(req, res, next);
  }
});

router.get('/:userId', gatekeeper.isAdminOrSelf, (req, res, next) => {
  findOrCreateCartByUser(req, res, next);
});

router.post('/:orderId/:productId', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
  Product.findById(req.params.productId)
  .then(selectedProduct => {
    const product = selectedProduct;
    return Order.findById(req.params.orderId)
    .then(order => {
      return order.addProduct(product, {unit_quantity: req.body.quantity, unit_price: product.price});
    })
  })
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(next);
});

router.put('/:orderId/:productId', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
  ProductOrder.update({
    unit_quantity: req.body.quantity
  }, {
    where: {
      orderId: +req.params.orderId,
      productId: +req.params.productId
    },
    returning: true
  })
  .then(([rowCount, updatedObj]) => {
    res.status(201).json(updatedObj)
  })
  .catch(next);
});


router.delete('/:orderId/:productId', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
  ProductOrder.destroy({
    where: {
      orderId: req.params.orderId,
      productId: req.params.productId
    }
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next);
});
