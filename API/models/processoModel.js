'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProcessoModel extends Model {
    static associate(models) {
      this.belongsTo(models.Tribunal, { foreignKey: 'idTribunal', as: 'tribunal' });
      this.belongsTo(models.Seccao, { foreignKey: 'idSeccao', as: 'seccao' });
      this.belongsTo(models.EstadoProcesso, { foreignKey: 'idEstadoProcesso', as: 'estado' });
      this.belongsTo(models.Letra, { foreignKey: 'idLetra', as: 'letra' });
      this.hasMany(models.ProcessoArguido, { foreignKey: 'idProcesso', as: 'arguidos' });
      this.hasMany(models.ProcessoDeclarante, { foreignKey: 'idProcesso', as: 'declarantes' });
      this.belongsToMany(models.Arguido, {through: models.ProcessoArguido,foreignKey: 'idProcesso', otherKey: 'idArguido', as: 'arguido'});
    }
  } 

  ProcessoModel.init({
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
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