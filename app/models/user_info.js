const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class User_info extends Model {}

const userSchema = User_info.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MotherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"), //dropdown
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    Occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Native_Place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    First_Language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Resume: {
      type: DataTypes.STRING, // image upload
      allowNull: true,
    },
    RestToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User_info",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User_info;
