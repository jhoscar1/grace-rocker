const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product_order', {
    unit_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: Sequelize.INTEGER,
      get: function(){
        return this.getDataValue('unit_price') / 100
      }
    },
    subtotal: {
      type: Sequelize.INTEGER,
      get: function(){
        return this.getDataValue('subtotal') / 100
      }
    }
  }, {
    hooks: {
      //dummy values for hook
      beforeCreate: function(instance){
        instance.unit_price = 500;
        instance.unit_quantity = 5;
        instance.subtotal = (instance.getDataValue('unit_price') * instance.unit_quantity)
    }
  }
})
