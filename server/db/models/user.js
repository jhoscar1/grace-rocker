const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
};

module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
}, {
  instanceMethods: {
    correctPassword (candidatePwd) {
      return this.Model.encryptPassword(candidatePwd, this.salt) === this.password;
    }
  },
  classMethods: {
    generateSalt () {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword (plainText, salt) {
      return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
    }
  },
  getterMethods: {
    createdAt: function(){
      const unreadable = this.getDataValue('createdAt');
      return unreadable.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});
