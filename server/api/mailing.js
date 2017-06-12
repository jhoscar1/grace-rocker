const router = require('express').Router();
const gatekeeper = require('../utils/gatekeeper');
const mailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const transporter = require ('../')

router.get('/', (req, res, next) => {
  console.log('request recieve')
  res.sendStatus(201);
});

router.post('/', (req, res, next) => {
  console.log('request recieve')

  const template = `
    <h1>Order Confirmation!</h1>
    <p>Your order has been confirmed!</p>
    `
  const mailOptions = {
    from: '"Orders @ Grace Rocker"- <mailservice.gracerocker.@gmail.com>', // sender address
    to: 'smorrow@oberlin.edu', // list of receivers
    subject: 'Order Confirmation', // Subject line
    html: template, // html body
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      next(error)
    }
  })
  .then(() => {
    res.sendStatus(200)
  })
  .catch(console.error.bind(console))
});

module.exports = router;
