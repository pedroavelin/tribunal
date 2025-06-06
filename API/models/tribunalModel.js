'use strict';
const { Model, DataTypes } = require('sequelize');

class Tribunal extends Model {
  static associate(models) {
    this.belongsTo(models.Municipio, {
      foreignKey: 'idMunicipio',
      as: 'municipio'
    });

    this.hasMany(models.Seccao, {
      foreignKey: 'idTribunal',
      as: 'seccoes'
    });

    this.hasMany(models.Processo, {
      foreignKey: 'idTribunal',
      as: 'processos'
    });
  }
}

module.exports = (sequelize) => {
  Tribunal.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
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
    modelName: 'Tribunal',
    tableName: 'tribunais',
    freezeTableName: true,
    timestamps: false
  });

  return Tribunal;
};
