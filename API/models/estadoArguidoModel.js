'use strict';
const { Model, DataTypes } = require('sequelize');

class EstadoArguido extends Model {
  static associate(models) {
    // associações aqui, se houver ok
  }
}

module.exports = (sequelize) => {
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