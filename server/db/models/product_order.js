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
        // const promises = instances.map(instance => {
        //   return Order.findById(instance.orderId)
        // });
        return Order.findById(instances[0].orderId)
        .then(foundOrder => {
          console.log('before', foundOrder);
          foundOrder.totalCost += instances[0].subtotal;
          console.log('after', foundOrder);
          return foundOrder.save();
        })
        .then(() => {
          console.log('actually saved?');
        })
        .catch(console.error)
        // console.log(promises[0]);
        // return Promise.all(promises)
        // .then(foundOrders => {
        //   // console.log(foundOrders);
        //   foundOrders.map((foundOrder, i) => {
        //     // console.log(i,": ", instances[i].subtotal);
        //     foundOrder.totalCost += instances[i].subtotal
        //     return foundOrder.save()
        //   })
        // })
        // .then(() => {
        //   console.log('saved');
        // })
    }
  }
})
