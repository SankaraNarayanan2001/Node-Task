'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User_address', [{
     
      Address:'k.pudur',
      City:'Madurai',
      State:'Tamilnadu',
      Country:'India',
      PostalCode:625007,
      User_info_id:1
         

    }]);
  },
  

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_address', null, {});
  }
};
