'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProcessoModel extends Model {
    static associate(models) {
      this.belongsTo(models.Tribunal, { foreignKey: 'idTribunal', as: 'tribunal',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.belongsTo(models.Seccao, { foreignKey: 'idSeccao', as: 'seccao',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.belongsTo(models.EstadoProcesso, { foreignKey: 'idEstadoProcesso', as: 'estado',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.belongsTo(models.Letra, { foreignKey: 'idLetra', as: 'letra',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.hasMany(models.ProcessoArguido, { foreignKey: 'idProcesso', as: 'arguidos',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.hasMany(models.ProcessoDeclarante, { foreignKey: 'idProcesso', as: 'declarantes',   onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      this.belongsToMany(models.Arguido, {through: models.ProcessoArguido,foreignKey: 'idProcesso', otherKey: 'idArguido', as: 'arguido',   onDelete: 'RESTRICT', onUpdate: 'CASCADE'});
    }
  } 

  ProcessoModel.init({
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_processo_ano',
      validate: { notEmpty: true }
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'unique_processo_ano'
    },
    crime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idTribunal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idSeccao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEstadoProcesso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idLetra: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Processo',
    tableName: 'processos',
    freezeTableName: true,
    timestamps: false
  });
  return ProcessoModel;
};