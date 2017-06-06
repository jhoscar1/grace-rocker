const Sequelize = require('sequelize');
const db = require('../db');
const ProductOrder = require('./product_order')

module.exports = db.define('order', {
  purchase_date: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
  }
},
{
  getterMethods: {
    totalCost(){
      return ProductOrder.findAll({
        where: {
          orderId: this.id
        }
      })
      .then(orderArray => {
        var output = 0;
        orderArray.forEach(order => {
          output += order.subtotal
        })
        return output;
      })
    }
  },
  hooks: {
    beforeCreate: function(instance){
      instance.purchase_date = Date.now()
    }
  }
})
