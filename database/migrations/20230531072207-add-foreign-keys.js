'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('User_address', {
      fields: ['User_info_id'],
      type: 'foreign key',
      name: 'fk_user_address_user_info',
      references: {
        table: 'User_info',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('User_qualification', {
      fields: ['User_info_id'],
      type: 'foreign key',
      name: 'fk_user_qualification_user_info',
      references: {
        table: 'User_info',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('User_address', 'fk_user_address_user_info');
    await queryInterface.removeConstraint('User_qualification', 'fk_user_qualification_user_info');
  },
};
