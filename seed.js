var Promise = require('bluebird');
var db = require('./server/db');
var Product = require('./server/db/models').Product;
var ProductOrder = require('./server/db/models').ProductOrder
var Order = require('./server/db/models').Order;
var Review = require('./server/db/models').Review;
var User = require('./server/db/models').User;


var data = {
  user: [
    {name: 'Shaun', email: 'shaun@shaunsworld.com', password: 'nothashed', shippingAddress: '111 Shaun Street, Shawnee Hills, OH'},
    {name: 'Geoff', email: 'geoff@geoffstack.com', password: 'geoffsmyname', shippingAddress: '124 Geoff Drive, NYC, NY'}
    ],
  product: [
    {name: 'Product1', carat: 5, price: 50, stock: 1, description: 'A really really cool product'}, {name: 'Product2', carat: 1, price: 100, stock: 4, description: 'A kinda really cool product'}
  ],
  review: [
    {body: 'What product am I even reviewing right now?', stars: 3}
  ]
}

var orderData = [
  {total_cost: 10000, status: 'created'}, {total_cost: 15000, status: 'created'}, {total_cost: 1000, status: 'cancelled'}
]

var productArray;

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    })
  });
})
.then(() => {
  return Product.findAll()
  .then(productArr => {
    productArray = productArr
  })
})
.then(function() {
  return Promise.map(orderData, function (orderItem) {
    return db.model('order')
    .create(orderItem)
    .then(order => {
      return Promise.map(productArray, productInst => {
        return order.addProduct(productInst, {unit_quantity: Math.floor(Math.random() * 100), unit_price: productInst.priceInCents})
      })
    });
  });
})
.then(function () {
  console.log("Finished inserting data");
})
.catch(function (err) {
  console.error('There was a problem: \n', err, err.stack);
})
.finally(function () {
  db.close()
  console.log('connection closed');
  return null;
});
