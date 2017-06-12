const Order = require('../db/models/').Order
const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'), require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/cart', require('./cart'));
router.use('/mailing', require('./mailing'));


router.use((req, res) => {
  res.status(404).send('Not found');
});
