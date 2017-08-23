const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, allowNull: false},
  password: { type: Sequelize.STRING, allowNull: true},
  firstName: { type: Sequelize.STRING, allowNull: false},
  lastName: { type: Sequelize.STRING, allowNull: true},
}, {
  timestamps: false,
  classMethods: {
    associate: function(models) {
      // associations can be defined here
    }
  }
});

User.sync();

module.exports  = User;