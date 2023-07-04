"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_info", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FatherName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MotherName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      Nationality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Gender: {
        type: Sequelize.ENUM("Male", "Female", "Other"), //dropdown
        allowNull: false,
      },
      PhoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      Occupation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Native_Place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      First_Language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Resume: {
        type: Sequelize.STRING, // image upload
        allowNull: true,
      },
      RestToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User_info");
  },
};
