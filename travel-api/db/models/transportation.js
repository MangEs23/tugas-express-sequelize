'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transportation.hasMany(models.Transaction, {
        foreignKey: 'transportation_id',
        onUpdate: 'RESTRICT'
      })
    }
  }
  Transportation.init({
    plat: DataTypes.STRING,
    mobil: DataTypes.STRING,
    supir: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    rute: DataTypes.STRING,
    keberangkatan: DataTypes.DATE,
    seat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transportation',
  });
  return Transportation;
};