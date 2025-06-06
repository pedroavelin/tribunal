'use strict';
const { Model, DataTypes } = require('sequelize');

class Provincia extends Model {
  getInfo() {
    return `Província: ${this.nome}`;
  }

  static async findByName(nome) {
    return await this.findOne({ where: { nome } });
  }

  static associate(models) {
    this.hasMany(models.Municipio, {
      foreignKey: 'idProvincia',
      as: 'municipios'
    });
  }
}

module.exports = (sequelize) => {
  Provincia.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'provincias',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['nome'],
        name: 'unique_provincia_nome'
      }
    ]
  });

  return Provincia;
};
