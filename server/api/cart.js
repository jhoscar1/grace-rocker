const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product');
const ProductOrder = require('../db').model('product_order');

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
    console.log('order by user', order);
    req.session.order = order.id;
    return order;
  })
  .then((order) => {
    order.setUser(req.user)
    .then(setOrder => {
      res.json(setOrder);
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


router.get('/:userId', (req, res, next) => {
  res.json(req.order)
});

router.post('/:orderId/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
  .then(selectedProduct => {
    const product = selectedProduct;
    return Order.findById(req.params.orderId)
    .then(order => {
      return order.addProduct(product, {unit_quantity: req.body.quantity});
    })
  })
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(next);
});

router.put('/:orderId/:productId', (req, res, next) => {
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

router.delete('/:orderId/:productId', (req, res, next) => {
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
})