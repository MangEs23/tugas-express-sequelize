'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
        onUpdate: 'RESTRICT'
      })
      Transaction.belongsTo(models.Transportation, {
        foreignKey: 'transportation_id',
        onUpdate: 'RESTRICT'
      })
    }
  }
  Transaction.init({
    nama: DataTypes.STRING,
    banyak: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    tanggal: DataTypes.DATEONLY,
    transportation_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};