'use strict';
const { Model, DataTypes } = require('sequelize');

class Letra extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      letra: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 2]
        }
      }
    }, {
      sequelize,
      modelName: 'Letra',
      tableName: 'letras',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['letra'],
          name: 'unique_letra'
        }
      ]
    });
  }

  static associate(models) {
    this.hasMany(models.Processo, {
      foreignKey: 'idLetra',
      as: 'processos'
    });
  // Removida a relação com User
    // this.hasMany(models.User, {
    //   foreignKey: 'idLetra',
    //   as: 'usuarios'
    // });
    Letra.hasMany(models.User, {
    foreignKey: 'idLetra',
    as: 'usuarios'
  });
  }
}

module.exports = (sequelize) => {
  Letra.init(sequelize);
  return Letra;
};