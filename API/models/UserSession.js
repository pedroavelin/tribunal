// models/UserSession.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    static associate(models) {
      UserSession.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserSession.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'UserSession',
    tableName: 'user_sessions',
  });
  return UserSession;
};