  const {
    DataTypes
  } = require('sequelize');

  module.exports = (sequelize) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
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
      isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      timestamps: true,
      paranoid: true
    });

    User.associate = (models) => {
      User.belongsToMany(models.Role, {
        through: 'UserRoles',
        foreignKey: 'userId',
        otherKey: 'roleId',
        as: 'users'
      });
      User.belongsTo(models.Seccao, {
        foreignKey: 'idSeccao',
        as: 'seccao'
      });
      User.belongsTo(models.Letra, { 
        foreignKey: 'idLetra', 
        as: 'letra' 
      });
    };
    return User;
  };