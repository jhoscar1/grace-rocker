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

// This is to update the cart for a specific product
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

// This is to update the cart's status
// router.put('/changeStatus/:orderId', (req, res, next) => {
//   Order.update({
//     status: req.body.status
//   })
// });

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
