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
    }
  }, {
    classMethods: {
      getTotalCost: function(id){
        return this.findAll({
          where: {orderId: id}
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
    getterMethods: {
        subtotal: function() {
            return this.unit_price * this.unit_quantity;
        }
    },
    hooks: {
      //dummy values for hook
    //   beforeCreate: function(instance){
    //     console.log('im here', instance)
    //     instance.unit_price = 5009;
    //     instance.unit_quantity = 5;
    //     instance.subtotal = (instance.getDataValue('unit_price') * instance.unit_quantity)
    //     return instance;
    // }
  }
})
