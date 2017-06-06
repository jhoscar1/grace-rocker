const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./order')

console.log(Order);

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
    }
  }, {
    getterMethods: {
        subtotal: function() {
            return this.unit_price * this.unit_quantity;
        }
    },
    hooks: {
      beforeBulkCreate: function(instances){
        console.log(instances)
        const promises = instances.map(instance => {
          return Order.findById(instance.orderId)
        });
        return Promise.all(promises)
        .then(foundOrders => {
          return Promise.all(
            foundOrders.map((foundOrder, i) => {
              foundOrder.totalCost += instances[i].subtotal
              return foundOrder.save()
            })
          )
        })
        .then(() => {
          console.log('saved');
        })
    }
  }
})
