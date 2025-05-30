// models/UserSession.js
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    static associate(models) {
      UserSession.belongsTo(models.User, { 
        foreignKey: 'userId',
        as: 'user' // Adicione um alias
      });
    }
  }
  UserSession.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Note: lowercase para MySQL
        key: 'id',
      }
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserSession',
    tableName: 'user_sessions',
    timestamps: true, // Adiciona createdAt e updatedAt
    underscored: true // Converte camelCase para snake_case
  });
  return UserSession;
};