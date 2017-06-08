const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const ProductOrder = require('./product_order');

Order.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Product);

User.hasMany(Order);
User.hasMany(Review);
Product.hasMany(Review, {
  onDelete: 'cascade',
  hooks: true
});

Product.belongsToMany(Order, {through: ProductOrder});
Order.belongsToMany(Product, {through: ProductOrder});

module.exports = {
  User,
  Order,
  Product,
  Review,
  ProductOrder
}
