const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('novastrid', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql'
});

module.exports = sequelize;