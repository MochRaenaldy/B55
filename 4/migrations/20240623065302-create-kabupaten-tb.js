'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kabupaten_tbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nama: {
        type: Sequelize.STRING
      },
      Provinsi_id: {
        type: Sequelize.INTEGER
      },
      diresmikan: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kabupaten_tbs');
  }
};