'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transportation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plat: {
        type: Sequelize.STRING
      },
      mobil: {
        type: Sequelize.STRING
      },
      supir: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      rute: {
        type: Sequelize.STRING
      },
      keberangkatan: {
        type: Sequelize.DATE
      },
      seat: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transportation');
  }
};