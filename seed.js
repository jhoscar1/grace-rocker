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
  {name: 'Jason', email: 'jason@shaunsworld.com', password: 'mypassword', shippingAddress: '1 Jason Avenue, Shawnee Hills, OH'},
  {name: 'David', email: 'david@shaunsworld.com', password: 'passie', shippingAddress: '55 David Drive, Columbus, OH'},
  {name: 'Geoff', email: 'geoff@geoffstack.com', password: 'geoffsmyname', shippingAddress: '124 Geoff Drive, NYC, NY'},
  {name: 'Cassio', email: 'cassio@geoffstack.com', password: 'reacter', shippingAddress: '126 Geoff Drive, NYC, NY'},
  {name: 'Dan', email: 'dan@geoffstack.com', password: 'dantheman', shippingAddress: '25 Dan Drive, NYC, NY'}
  ],
  product: [
    {name: 'Rubies', carat: 5, price: 50, stock: 1, description: 'A really really cool product', tags: ["shiny", "ruby", "rock"]},
    {name: 'Gems', carat: 1, price: 100, stock: 4, description: 'A kinda really cool product', tags: ["shiny", "rock"]},
    {name: 'Diamonds', carat: 1, price: 4500, stock: 87, description: 'Diamonds are forever', tags: ["shiny", "rock"]},
    {name: 'Meteor', carat: 1000, price: 90000, stock: 1, description: 'A big meteor', tags: ["big", "rock"]},
    {name: 'Pig Iron', carat: 2, price: 500, stock: 2, description: 'A hunk of iron with pig ears', tags: ["animal", "rock"]},
    {name: 'Cat Iron', carat: 2, price: 200, stock: 5, description: 'A hunk of iron with cat ears', tags: ["animal", "rock"]},
    {name: 'Fools Iron', carat: 6, price: 100, stock: 200, description: 'Only a fool would buy this iron', tags: ["trick", "rock", "shiny"]},
    {name: 'Gold', carat: 2, price: 10000, stock: 5, description: 'Just gold', tags: ["shiny", "evil", "money"]},
    {name: 'Sapphires', carat: 16, price: 5000, stock: 15, description: 'A mediocre gem', tags: ["shiny", "gem", "rock"]}
  ],
  review: [
    {body: 'What product am I even reviewing right now?', stars: 3},
    {body: 'I am questioning why I purchased this?', stars: 2},
    {body: 'I am content with this I suppose?', stars: 3},
    {body: 'A good product, if you are stupid?', stars: 2},
    {body: 'I did not like this very much I think?', stars: 1},
    {body: 'I did not like this at all I think?', stars: 1},
    {body: 'I am loving this?', stars: 4},
    {body: 'A good product, NOT?', stars: 2},
    {body: 'Possibly the worst product in the world?', stars: 1},
    {body: 'I did not like this at all, I would like my money back please?', stars: 1},
    {body: 'A wonderful product, where can I get more?', stars: 4},
    {body: 'What product am I even reviewing right now?', stars: 3},
    {body: 'I am questioning why I purchased this?', stars: 2},
    {body: 'I am content with this I suppose?', stars: 3},
    {body: 'A good product, if you are smart?', stars: 4},
    {body: 'I did like this very much I think?', stars: 5},
    {body: 'I did like this somewhat I think?', stars: 3}
  ]
}

var orderData = [
  {status: 'created'}, {status: 'created'}, {status: 'cancelled'}
]

var productArray, userArray, reviewArray;

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
.then(() => {
  return User.findAll()
  .then(userArr => {
    userArray = userArr
  })
})
.then(() => {
  return Review.findAll()
  .then(reviewArr => {
    reviewArray = reviewArr
  })
})
.then(() => {
  return reviewArray.forEach(review => {
    review.setUser(userArray[Math.floor(Math.random() * userArray.length)]);
    review.setProduct(productArray[Math.floor(Math.random() * productArray.length)])
  });
})
.then(function() {
  return Promise.map(orderData, function (orderItem) {
    return db.model('order')
    .create(orderItem)
    .then(order => {
      return Promise.map(productArray, productInst => {
        return order.addProduct(productInst, {unit_quantity: Math.floor(Math.random() * 10), unit_price: productInst.priceInCents})
      })
      .then(() => {
        return order.setUser(userArray[Math.floor(Math.random() * userArray.length)])
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
