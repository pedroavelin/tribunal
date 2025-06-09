// models/User.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSession, { foreignKey: 'userId' });
      User.belongsTo(models.Letra, { foreignKey: 'idLetra', as: 'letra' });
      User.belongsTo(models.Tribunal, { foreignKey: 'tribunalId', as: 'tribunal' });
      User.belongsTo(models.Seccao, { foreignKey: 'idSeccao', as: 'seccao' });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    tribunalId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tribunal',
        key: 'id'
      }
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