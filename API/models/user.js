'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSession, { foreignKey: 'userId', as: 'sessions' });
      User.belongsTo(models.Letra, { foreignKey: 'idLetra', as: 'letra' });
      User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
    }

    toJSON() {
      const attributes = { ...this.get() };
      delete attributes.password;
      return attributes;
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastActivity: {
      type: DataTypes.DATE,
      allowNull: true
    },
    idLetra: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'letras',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true
  });

  return User;
};
