const router = require('express').Router();
const gatekeeper = require('../utils/gatekeeper');
const mailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

 const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailservice.gracerocker@gmail.com',
      pass: 'rockinbot'
    },
  });

  transporter.use('compile', inlineBase64());

  router.get('/', (req, res, next) => {
    res.sendStatus(201);
  });

  router.post('/', (req, res, next) => {
    if (!req.user) res.send(204);
    const productsList = req.body.products.map(product => {
        return `<li> ${product.product_order.unit_quantity} ${product.name} </li>`
    }).join('')

  const orderTotal = req.body.products.reduce((acc, val) => {
      return acc + val.product_order.subtotal
  }, 0)
  const template = `
    <h1>Order Confirmation</h1>
    <p>Your order has been confirmed!</p>
    <p>You ordered:</p>
    <ul>${productsList}</ul>
    <p> Total order cost: $ ${orderTotal} </p>


    <marquee> Thank you for shopping at Grace Rocker, the premier rock repository on the net! Your business is highly appreciated! </marquee>
    <p style="color:red"> A sizzling hot tip for you, our most loyal customer! - - - Use promocode 'HOTGEOFF' for a 50% discount on your next order! ... Yeouch, that burns! - - - </p>   `
  const mailOptions = {
    from: '"Orders @ Grace Rocker"- <mailservice.gracerocker.@gmail.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: 'Order Confirmation', // Subject line
    html: template // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      next(error)
    } else {
      res.json(info)
    }
  })
});

module.exports = router;
