'use strict';
const { Model, DataTypes } = require('sequelize');

class Declarante extends Model {
  static associate(models) {
    this.belongsTo(models.Endereco, {
      foreignKey: 'idEndereco',
      as: 'endereco'
    });
  }
}

module.exports = (sequelize) => {
  Declarante.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    idEndereco: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telf1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telf2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Declarante',
    tableName: 'declarantes',
    freezeTableName: true,
    timestamps: false
  });

  return Declarante;
};
