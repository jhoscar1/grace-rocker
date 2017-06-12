const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product_order', {
    unit_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    unit_price: {
      type: Sequelize.INTEGER,
      get: function(){
        return this.getDataValue('unit_price') / 100
      }
    }
  }, {
    getterMethods: {
        subtotal: function() {
            return this.unit_price * this.unit_quantity;
        }
    },
    hooks: {
  }
})
