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
      return this.getDataValue('price')
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif"
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
    },
    tagsArray: function(){
      return this.getDataValue('tags')
    }
  }
})
