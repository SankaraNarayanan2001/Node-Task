"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_qualification", [
      {
        Degree: "BCA",
        Institution: "MKU",
        Skills: "Programming, Design, Marketing",
        Graduation_Year: 2022,
        FieldOfStudy: "comupter",
        Grade: "A",
        User_info_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User_qualification", null, {});
  },
};
