const Order = require('../db/models/').Order
const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.use('/orders', require('./orders'));

router.get('/testroute', function(req, res, next){
  return Order.findById(1)
  .then((order) => {
    return order.totalCost
  })
  .then(info => {
    res.send({totalCost: info})
  })
})

router.use((req, res) => {
  res.status(404).send('Not found');
});
