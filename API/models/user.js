// models/User.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSession, { foreignKey: 'userId' });
    }
  }
  
User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN,
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastActivity: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});
  return User;
};