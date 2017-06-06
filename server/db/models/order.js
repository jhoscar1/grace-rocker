const Sequelize = require('sequelize');
const db = require('../db');
const ProductOrder = require('./product_order')

module.exports = db.define('order', {
  purchase_date: {
    type: Sequelize.DATE,
  },
  total_cost: {
    type: Sequelize.INTEGER,
    get: function(){
      return this.getDataValue('total_cost') / 100
    }
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
  }
},
{
  getterMethods: {
    total_cost: function(){
      return this.getDataValue('total_cost')
      //there should be something great here
    }
  },
  hooks: {
    beforeCreate: function(instance){
      instance.purchase_date = Date.now()
    }
  }
})
