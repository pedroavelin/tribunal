'use strict';
const { Model, DataTypes } = require('sequelize');

class ProcessoDeclarante extends Model {
  static associate(models) {
    this.belongsTo(models.Processo, {
      foreignKey: 'idProcesso',
      as: 'processo'
    });
    this.belongsTo(models.Declarante, {
      foreignKey: 'idDeclarante',
      as: 'declarante'
    });
  }
}

module.exports = (sequelize) => {
  ProcessoDeclarante.init({
    idProcesso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'processos', // nome da tabela no plural, ajustar conforme seu BD
        key: 'id'
      }
    },
    idDeclarante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'declarantes', // nome da tabela no plural, ajustar conforme seu BD
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProcessoDeclarante',
    tableName: 'processo_declarantes', // nome no plural e underscore é padrão comum
    freezeTableName: true,
    timestamps: false
  });

  return ProcessoDeclarante;
};
