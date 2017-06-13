const router = require('express').Router();
const Review = require('../db').model('review');
const Product = require('../db').model('product');
const User = require('../db').model('user');
const Order = require('../db').model('order')


var stripe = require("stripe")(process.env.STRIPE_KEY)

router.post('/checkout', function (req, res, next){
  stripe.charges.create(req.body)
  .then(charge => {
    let stripeChargeId = charge.id;
    return Order.update({stripeChargeId})
  })
})

module.exports = router;
