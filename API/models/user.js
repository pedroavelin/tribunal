// models/User.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSession, { foreignKey: 'userId', as: 'sessions' });
      User.belongsTo(models.Letra, { foreignKey: 'idLetra', as: 'letra' });
      User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
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