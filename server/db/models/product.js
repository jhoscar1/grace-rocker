const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  carat: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get: function(){
      return this.getDataValue('price') / 100
    }
  },
  stock: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "this should be a stock photo"
  },
  tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        get: function() {
            return this.getDataValue("tags").join(", ")
        }
  }
}, {
  getterMethods: {
    priceInCents: function(){
      return this.getDataValue('price')
    }
  }
})
