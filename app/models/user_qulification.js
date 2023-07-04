const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

const User_info = require("../models/user_info");

class User_qualification extends Model {}

User_qualification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Skills: {
      type: DataTypes.STRING, // Multiselect field
      allowNull: false,
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue("Skills", value.join(","));
        } else {
          this.setDataValue("Skills", value);
        }
      },
    },
    Graduation_Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FieldOfStudy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    User_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User_info,
        key: "User_info_id",
      },
    },
  },
  {
    sequelize,
    modelName: "User_qualification",
    freezeTableName: true,
    timestamps: false,
  }
);

User_qualification.belongsTo(User_info, { foreignKey: "User_info_id" });
User_info.hasMany(User_qualification, { foreignKey: "User_info_id" });

module.exports = User_qualification;
