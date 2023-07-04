const Sequelize = require('sequelize');


require('dotenv').config();

const sequelize = new Sequelize('novastrid', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql'
});


    sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // console.error('Unable to connect to the database:', error);


module.exports = sequelize;