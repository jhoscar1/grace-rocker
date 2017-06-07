const Order = require('../db/models/').Order
const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.get('/testroute', function(req, res, next){
  console.log('hi we are in the test route')
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
