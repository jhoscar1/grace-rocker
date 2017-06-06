const Sequelize = require('sequelize');
const db = require('../db');
//const ProductOrder = require('./product_order');

module.exports = db.define('order', {
  purchase_date: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
  },
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // get: function(){
    //     return this.getDataValue('totalCost') / 100
    // }
  }
},
{
  hooks: {
    beforeCreate: function(instance){
      instance.purchase_date = Date.now();
    }
  }
})
