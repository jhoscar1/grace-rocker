const router = require('express').Router();
const gatekeeper = require('../utils/gatekeeper');
const mailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

 const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailservice.gracerocker@gmail.com',
    pass: 'rockinbot',
  },
});

  transporter.use('compile', inlineBase64());

router.get('/', (req, res, next) => {
  res.sendStatus(201);
});

router.post('/', (req, res, next) => {
  console.log('request recieve')
  console.log("BODY", req.body)

  const productsList = req.body.products.map(product => {
      return `<li> ${product.product_order.quantity} ${product.name} </li>`
    }).join('')

  console.log("PRODUCTS LIST", productsList);

  const template = `
    <h1>Order Confirmation!</h1>
    <p>Your order has been confirmed!</p>
    <p>You ordered:</p>
    <ul>${productsList}</ul>
    `
  const mailOptions = {
    from: '"Orders @ Grace Rocker"- <mailservice.gracerocker.@gmail.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: 'Order Confirmation', // Subject line
    html: template, // html body
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
