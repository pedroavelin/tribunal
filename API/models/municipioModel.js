'use strict';
const { Model, DataTypes } = require('sequelize');

class Municipio extends Model {
  static associate(models) {
    this.hasMany(models.Seccao, {
      foreignKey: 'idMunicipio',
      as: 'seccoes'
    });

    this.hasMany(models.Tribunal, {
      foreignKey: 'idMunicipio',
      as: 'tribunais'
    });
  }
}

module.exports = (sequelize) => {
  Municipio.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    idProvincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provincias',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Municipio',
    tableName: 'municipios',
    freezeTableName: true,
    timestamps: false
  });
  return Municipio;
};
