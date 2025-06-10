'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstadoArguido extends Model {
    static associate(models) {
      // Associações podem ser definidas aqui, se necessário
    }
  }

  EstadoArguido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EstadoArguido',
    tableName: 'estado_arguidos',
    timestamps: false
  });

  return EstadoArguido;
};
