'use strict';
const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
  static associate(models) {
    this.belongsToMany(models.Role, {
      through: 'RolePermissions',
      foreignKey: 'permissionId',
      otherKey: 'roleId'
    });
  }
}

module.exports = (sequelize) => {
  Permission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    freezeTableName: true,
    timestamps: true
  });

  return Permission;
};
