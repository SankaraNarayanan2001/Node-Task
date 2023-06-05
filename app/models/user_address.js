const sequelize = require('../config/db')

const { DataTypes, Model } = require('sequelize');

const User_info = require('./user_info');

class User_address extends Model {

}

User_address.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  State: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PostalCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  User_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User_info,
      key: 'User_info_id',
    },
  }
},
  {
    sequelize,
    modelName: 'User_address',
    freezeTableName: true,
    timestamps: false

  });


User_address.belongsTo(User_info, { foreignKey: 'User_info_id' });
User_info.hasMany(User_address, { foreignKey: 'User_info_id' });


module.exports = User_address;