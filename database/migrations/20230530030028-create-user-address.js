'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_address', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      City: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      State: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PostalCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      User_info_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_address');
  }
};



