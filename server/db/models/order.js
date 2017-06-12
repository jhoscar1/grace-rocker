const Sequelize = require('sequelize');
const db = require('../db');
const ProductOrder = require('./product_order')

module.exports = db.define('order', {
  purchase_date: {
    type: Sequelize.DATE,
    get: function(){
      const unreadable = this.getDataValue('purchase_date');
      return unreadable.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: "created"
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
