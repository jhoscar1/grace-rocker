var Promise = require('bluebird');
var db = require('./server/db');
var Product = require('./server/db/models').Product;
var ProductOrder = require('./server/db/models').ProductOrder
var Order = require('./server/db/models').Order;
var Review = require('./server/db/models').Review;
var User = require('./server/db/models').User;


var data = {
  user: [
  {name: 'Big Boss', email: 'admin@admin.com', password: 'admin', isAdmin: true},
  {name: 'Shaun', email: 'shaun@shaunsworld.com', password: 'nothashed', shippingAddress: '111 Shaun Street, Shawnee Hills, OH'},
  {name: 'Jason', email: 'jason@shaunsworld.com', password: 'mypassword', shippingAddress: '1 Jason Avenue, Shawnee Hills, OH'},
  {name: 'David', email: 'david@shaunsworld.com', password: 'passie', shippingAddress: '55 David Drive, Columbus, OH'},
  {name: 'Geoff', email: 'geoff@geoffstack.com', password: 'geoffsmyname', shippingAddress: '124 Geoff Drive, NYC, NY'},
  {name: 'Cassio', email: 'cassio@geoffstack.com', password: 'reacter', shippingAddress: '126 Geoff Drive, NYC, NY'},
  {name: 'Dan', email: 'dan@geoffstack.com', password: 'dantheman', shippingAddress: '25 Dan Drive, NYC, NY'}
  ],
  product: [
    {name: 'Ruby', carat: 5, price: 50, stock: 1, description: 'dumb', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1000px-Ruby_logo.svg.png',  tags: ["shiny", "expensive", "red", "rock"]},
    {name: 'Gem', carat: 1, price: 100, stock: 4, description: 'A kinda really cool product', picture: 'https://gem.co/wp-content/uploads/2016/06/Logo-Vertical-square-300x300.png',   tags: ["shiny", "expensive", "rock"]},
    {name: 'Diamond', carat: 1, price: 4500, stock: 87, description: 'Diamonds are forever', picture: 'https://g.foolcdn.com/editorial/images/437660/diamond_large.jpg', tags: [ "shiny", "expensive", "rock"]},
    {name: 'Meteor', carat: 1000, price: 90000, stock: 1, picture: 'http://68.media.tumblr.com/cefc8154d1098e13fbd4f0ea5427ee2e/tumblr_n17xwwwVWf1ttwae3o1_1280.jpg',  description: 'A big meteor', tags: ["big", "grey", "celestial body", "rock"]},
    {name: 'Pig Iron', carat: 2, price: 500, stock: 2, description: 'A hunk of iron with pig ears', picture: 'https://pimg.tradeindia.com/02216539/b/1/Pig-Iron.jpg', tags: ["animal", "grey", "DIY", "home improvement", "rock"]},
    {name: 'Cat Iron', carat: 2, price: 200, stock: 5, description: 'A hunk of iron with cat ears', picture: 'http://artalika.com/painted_rocks/cats/rock_round-cat.jpg', tags: ["cute", "animal", "grey", "home improvement", "rock"]},
    {name: 'Fools Iron', carat: 6, price: 100, stock: 200, description: 'Only a fool would buy this iron', picture: 'https://images-na.ssl-images-amazon.com/images/I/51OyxZq-SQL._SX200_QL80_.jpg', tags: ["shiny", "rock"]},
    {name: 'Gold', carat: 2, price: 10000, stock: 5, tags: ["shiny", "evil", "greed"], description: 'Just gold', picture: 'http://image.shutterstock.com/z/stock-photo-c-programming-d-block-letters-gold-white-background-102665846.jpg'},
    {name: 'Sapphires', carat: 16, price: 5000, stock: 15, description: 'A mediocre gem', picture: 'http://www.lotusgemology.com/images/library/articles/quality/lotus-color-types/indigo-sapphire.jpg', tags: ["shiny", "expensive", "blue", "rock"]}
  ],
  review: [
    {title: 'Good Product', body: 'What product am I even reviewing right now?', stars: 3},
    {title: 'Good Product', body: 'I am questioning why I purchased this?', stars: 2},
    {title: 'Good Product', body: 'I am content with this I suppose?', stars: 3},
    {title: 'Good Product', body: 'A good product, if you are stupid?', stars: 2},
    {title: 'Good Product', body: 'I did not like this very much I think?', stars: 1},
    {title: 'Good Product', body: 'I did not like this at all I think?', stars: 1},
    {title: 'Good Product', body: 'I am loving this?', stars: 4},
    {title: 'Good Product', body: 'A good product, NOT?', stars: 2},
    {title: 'Good Product', body: 'Possibly the worst product in the world?', stars: 1},
    {title: 'Good Product', body: 'I did not like this at all, I would like my money back please?', stars: 1},
    {title: 'Good Product', body: 'A wonderful product, where can I get more?', stars: 4},
    {title: 'Good Product', body: 'What product am I even reviewing right now?', stars: 3},
    {title: 'Bad Product', body: 'I am questioning why I purchased this?', stars: 2},
    {title: 'Bad Product', body: 'I am content with this I suppose?', stars: 3},
    {title: 'Bad Product', body: 'A good product, if you are smart?', stars: 4},
    {title: 'Great Product', body: 'I did like this very much I think?', stars: 5},
    {title: 'Bad Product', body: 'I did like this somewhat I think?', stars: 3},
    {title: 'MY KIDS LOVE IT', body: 'I PURCHASED THIS ROCK FOR MY DAUGHTERS BIRTHDAY. SHE FOUND IT VERY ENTERTAINING AND EVEN SHOWED IT TO HER FRIENDS. I CANNOT BELIEVE WHAT A GREAT PRESENT THIS WAS. IF ANYONE--A N Y O N E--WHO IS AT ALL INTERESTED IN ROCKS, CANNOT MAKE UP HIS MIND ON WHAT ROCK TO BUY... THIS LITTLE GUY IS YOUR BEST BET. MY DAUGHTER IS WATCHING ME TYPE THIS REVIEW, AND SHE AGREES. THANK YOU FOR YOUR TIME', stars: 5},
    {title: 'horrible', body: 'stupid website makes me type a body', stars: 1},    {title: 'why do i have to write a title', body: 'JUST LET ME 1 STAR!!!!', stars: 1},
    {title: 'why do i have to write a title', body: 'JUST LET ME 1 STAR!!!!', stars: 1},
    {title: 'why do i have to write a title', body: 'JUST LET ME 1 STAR!!!!', stars: 1},
    {title: 'why do i have to write a title', body: 'JUST LET ME 1 STAR!!!!!!!', stars: 1},
    {title: 'why do i have to write a title', body: 'JUST LET ME 1 STAR!!!!!!!!', stars: 1},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'GOOD PRODUCT', body: '5 STARS!!!!', stars: 5},
    {title: 'Good Product', body: 'I am questioning why I purchased this?', stars: 2},
    {title: 'Good Product', body: 'I am content with this I suppose?', stars: 3},
    {title: 'Good Product', body: 'A good product, if you are stupid?', stars: 2},
    {title: 'Good Product', body: 'I did not like this very much I think?', stars: 1},
    {title: 'Good Product', body: 'I did not like this at all I think?', stars: 1},
    {title: 'Good Product', body: 'I am loving this?', stars: 4},
    {title: 'Good Product', body: 'A good product, NOT?', stars: 2},
    {title: 'Good Product', body: 'Possibly the worst product in the world?', stars: 1}, {title: 'Good Product', body: 'I am questioning why I purchased this?', stars: 2},
    {title: 'Good Product', body: 'I am content with this I suppose?', stars: 3},
    {title: 'Good Product', body: 'A good product, if you are stupid?', stars: 2},
    {title: 'Good Product', body: 'I did not like this very much I think?', stars: 1},
    {title: 'Good Product', body: 'I did not like this at all I think?', stars: 1},
    {title: 'Good Product', body: 'I am loving this?', stars: 4},
    {title: 'Good Product', body: 'A good product, NOT?', stars: 2},
    {title: 'Good Product', body: 'Possibly the worst product in the world?', stars: 1}
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
    userArray = userArr.slice(1)
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
        return order.addProduct(productInst, {unit_quantity: Math.floor(Math.random() * 10)+1, unit_price: productInst.priceInCents})
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
