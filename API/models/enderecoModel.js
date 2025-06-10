'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    static associate(models) {
      this.belongsTo(models.Municipio, {
        foreignKey: 'idMunicipio',
        as: 'municipio'
      });
    }
  }

  Endereco.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idMunicipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'municipios', // nome da tabela referenciada
        key: 'id'
      }
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false
    },
    casa: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
    freezeTableName: true,
    timestamps: false
  });

  return Endereco;
};
