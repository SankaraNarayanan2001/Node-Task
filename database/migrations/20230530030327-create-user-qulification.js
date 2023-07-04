"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_qualification", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Degree: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Institution: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      Skills: {
        type: Sequelize.STRING, // Multiselect field
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("skills");
          return rawValue ? rawValue.split(",") : [];
        },
        set(value) {
          this.setDataValue("skills", value.join(","));
        },
      },
      Graduation_Year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      FieldOfStudy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Grade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      User_info_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User_qualification");
  },
};
