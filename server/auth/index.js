const router = require('express').Router();
const User = require('../db/models/user');
const Order = require('../db').model('order');

module.exports = router
  .post('/login', (req, res, next) => {
    User.findOne({ where: { email: req.body.email }})
      .then(user => {
        if (!user)
          res.status(401).send('User not found');
        else if (!user.correctPassword(req.body.password))
          res.status(401).send('Incorrect password');
        else {
          prepareAnonCart(user, req.session.order);
          req.logIn(user, err => err ? next(err) : res.json(user));
        }
        return null;
      })
      .catch(next);
  })
  .post('/signup', (req, res, next) => {
    User.create(req.body)
      .then(user => {
        prepareAnonCart(user, req.session.order);
        req.login(user, err => err ? next(err) : res.json(user))
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError')
          res.status(401).send('User already exists');
        else next(err);
      });
  })
  .post('/logout', (req, res) => {
    delete req.session.order;
    req.logout();
    res.redirect('/');
  })
  .get('/me', (req, res) => {
    res.json(req.user);
  })
  .use('/google', require('./google'));

const prepareAnonCart = (user, orderId) => {
  console.log('here');
  Order.findAll({
    where: {
      userId: user.id,
      status: 'created'
    }
  })
  .then((foundOrder) => {
    if (!foundOrder.length) {
      Order.findById(orderId)
      .then(guestCart => {
        guestCart.setUser(user)
        .then(() => {
          console.log('Built cart');
        })
      })
      console.log('id', orderId);
    }
  })
}