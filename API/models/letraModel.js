'use strict';
const { Model, DataTypes } = require('sequelize');

class Letra extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      letra: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 1] // Garante que seja exatamente 1 caractere
        }
      }
    }, {
      sequelize,
      modelName: 'Letra',
      tableName: 'letras',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['letra'],
          name: 'unique_letra'
        }
      ]
    });
  }

  static associate(models) {
    this.hasMany(models.Processo, {
      foreignKey: 'idLetra',
      as: 'processos'
    });
    this.hasMany(models.User, {
      foreignKey: 'idLetra',
      as: 'usuarios'
    });
  }

  // Método de instância para formatar a letra
  getLetraFormatada() {
    return `Letra: ${this.letra.toUpperCase()}`;
  }

  // Método estático para buscar por letra
  static async findByLetra(letra) {
    return await this.findOne({ 
      where: { 
        letra: letra.toUpperCase() 
      } 
    });
  }
}

module.exports = (sequelize) => {
  Letra.init(sequelize);
  return Letra;
};