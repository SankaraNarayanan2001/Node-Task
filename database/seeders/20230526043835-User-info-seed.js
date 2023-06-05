'use strict';
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    return queryInterface.bulkInsert('User_info', [{

      FirstName: 'sankar',
      LastName: 'Narayanan',
      FatherName: 'Nagaraj',
      MotherName: 'Revathi',
      DateOfBirth: '2001-1-1',
      Nationality: 'Indian',
      Email: 'sankar@gmail.com',
      Password: await bcrypt.hash('Sankar@2001', 10),
      Gender: 'Male',
      PhoneNumber: 9345053902,
      Occupation: 'IT',
      Native_Place: 'Madurai',
      First_Language: 'Tamil',
      Resume: 'image.pdf',


    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_info', null, {});
  }
};
