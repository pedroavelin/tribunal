'use strict';
const { Model, DataTypes } = require('sequelize');

class Seccao extends Model {
  static associate(models) {
    this.belongsTo(models.Tribunal, {
      foreignKey: 'idTribunal',
      as: 'tribunal'
    });

    this.belongsTo(models.Municipio, {
      foreignKey: 'idMunicipio',
      as: 'municipio'
    });

    this.hasMany(models.Processo, {
      foreignKey: 'idSeccao',
      as: 'processos'
    });
  }
}

module.exports = (sequelize) => {
  Seccao.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
        // Adicione mais validações se quiser padronizar o número
      }
    },
    idTribunal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tribunais',
        key: 'id'
      }
    },
    idMunicipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'municipios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Seccao',
    tableName: 'seccoes',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['numero', 'idTribunal'],
        name: 'unique_seccao_tribunal'
      }
    ]
  });

  return Seccao;
};