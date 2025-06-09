  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
      static associate(models) {
        Role.belongsToMany(models.Permission, {
          through: 'RolePermissions',
          foreignKey: 'roleId',
          otherKey: 'permissionId',
          as: 'permissions'
        });
        Role.belongsToMany(models.User, {
        through: 'UserRoles',
        foreignKey: 'roleId',
        otherKey: 'userId',
        as: 'users'
      });
      }
    }
    Role.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Role',
    });
    return Role;
  };