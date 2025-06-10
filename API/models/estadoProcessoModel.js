'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstadoProcesso extends Model {
    static associate(models) {
      // Exemplo de associação futura:
      // this.hasMany(models.Processo, { foreignKey: 'idEstadoProcesso', as: 'processos' });
    }
  }

  EstadoProcesso.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EstadoProcesso',
    tableName: 'estado_processos',  
    freezeTableName: true,
    timestamps: false
  });

  return EstadoProcesso;
};
