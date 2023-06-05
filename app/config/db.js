const Sequelize = require('sequelize');

const sequelize = new Sequelize('novastrid', 'root', 'root123', {
    dialect: 'mysql'
});

module.exports = sequelize;