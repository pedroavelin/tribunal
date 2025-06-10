'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Letra extends Model {
    static associate(models) {
      this.hasMany(models.Processo, {
        foreignKey: 'idLetra',
        as: 'processos'
      });
      this.hasMany(models.User, { foreignKey: 'idLetra', as: 'usuarios' });
    }
  }

  Letra.init({
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

  return Letra;
};
