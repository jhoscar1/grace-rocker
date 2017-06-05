const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('order', {
  purchase_date: {
    type: Sequelize.DATE,
    allowNull: false
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
  hooks: {
    beforeCreate: function(instance){
      instance.purchase_date = Date.now()
    }
  }
})
