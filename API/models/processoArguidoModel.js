'use strict';
const { Model, DataTypes } = require('sequelize');

class ProcessoArguido extends Model {
  static associate(models) {
    this.belongsTo(models.EstadoArguido, {
      foreignKey: 'idEstadoArguido',
      as: 'estadoArguido'
    });

    this.belongsTo(models.Processo, {
      foreignKey: 'idProcesso',
      as: 'processo'
    });

    this.belongsTo(models.Arguido, {
      foreignKey: 'idArguido',
      as: 'arguido'
    });
  }
}

module.exports = (sequelize) => {
  ProcessoArguido.init({
    idProcesso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'processos',
        key: 'id'
      }
    },
    idArguido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'arguidos',
        key: 'id'
      }
    },
    idEstadoArguido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado_arguidos',
        key: 'id'
      }
    },
    pena: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataDeJulgamento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ProcessoArguido',
    tableName: 'processo_arguidos',
    freezeTableName: true,
    timestamps: false
  });

  return ProcessoArguido;
};
