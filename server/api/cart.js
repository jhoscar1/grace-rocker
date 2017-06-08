const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product')

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
  .catch(next)
});


router.get('/:userId', (req, res, next) => {
  res.json(req.order)
});
