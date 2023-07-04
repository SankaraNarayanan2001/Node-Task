const user_info = require("../models/user_info");
const user_address = require("../models/user_address");
const appError = require("../utils/appError");
const user_qualification = require("../models/user_qulification");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class userService {
  async loginUser(Email, Password) {
    if (!Email || !Password) {
      throw new appError(400, "Email and password are required");
    }

    const UserId = await user_info.findOne({ where: { Email } });

    if (!UserId || UserId.id == "1") {
      throw new appError(404, "User not found");
    }

    const passwordcompare = await bcrypt.compare(Password, UserId.Password);

    if (Email === UserId.Email && passwordcompare) {
      const token = jwt.sign(
        {
          Email,
        },
        process.env.JWT_USER
      );
      return token;
    } else {
      throw new appError(500, "Username or password incorrect");
    }
  }

  async getUser(Email) {
    const users = await user_info.findOne({
      where: { Email },
      include: [{ model: user_address }, { model: user_qualification }],
    });
    return users;
  }
}

module.exports = userService;
