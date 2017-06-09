const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('review', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  getterMethods: {
    date: function() {
      return this.getDataValue('createdAt').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
)
