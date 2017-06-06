const ProductOrder = require('../db/models/').ProductOrder
const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));

router.get('/testroute', function(req, res, next){
  console.log('hi we are in the test route')
  return ProductOrder.getTotalCost('1')
  .then(info => {
    console.log(info)
    res.send({totalCost: info})
  })
})

router.use((req, res) => {
  res.status(404).send('Not found');
});
