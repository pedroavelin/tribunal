'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Arguido extends Model {
    static associate(models) {
      this.belongsTo(models.Endereco, {
        foreignKey: 'idEndereco',
        as: 'endereco'
      });
      this.belongsTo(models.EstadoArguido, {
        foreignKey: 'idEstado',
        as: 'estado'
      });
    }
  }

  Arguido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apelido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataDeNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    pai: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mae: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idEndereco: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Arguido',
    tableName: 'arguidos',
    freezeTableName: true,
    timestamps: false
  });

  return Arguido;
};
