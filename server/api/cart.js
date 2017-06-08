const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product');
const ProductOrder = require('../db').model('product_order');

module.exports = router;

router.param('userId', (req, res, next, id) => {
  Order.findOne({
    where: {
      status: 'created',
      userId: id
    },
    include: [Product]
  })
  .then(order => {
    req.order = order;
    next();
    return null;
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
    console.log(updatedObj);
    res.status(201).json(updatedObj)
  })
  .catch(next);
});


router.get('/:userId', (req, res, next) => {
  console.log('hi', req.order);
  res.json(req.order)
});
