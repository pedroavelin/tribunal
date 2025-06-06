'use strict';
const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
  static associate(models) {
    this.belongsTo(models.Municipio, {
      foreignKey: 'idMunicipio',
      as: 'municipio'
    });
  }
}

module.exports = (sequelize) => {
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
        model: 'municipios', // nome correto da tabela, ajuste conforme seu BD
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
    tableName: 'enderecos',  // plural padrão, ajuste conforme BD
    freezeTableName: true,
    timestamps: false
  });

  return Endereco;
};
