const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const sendEmail = require('../utils/email')
const user_qualification = require('../models/user_qulification')
const user_address = require('../models/user_address');
const user_info = require('../models/user_info');
const appError = require('../utils/appError');
const sequelize = require('../config/db');
const { userInfo } = require('os');

class adminService {
    async login(Email, Password) {
        if (!Email || !Password) {
            throw new appError(400, "Email and password are required");
        }
        const User = await user_info.findOne();
        const passwordcompare = await bcrypt.compare(Password, User.Password)
        if (Email === User.Email && passwordcompare) {
            const token = jwt.sign({
                Email
            }, process.env.JWT_ADMIN, { expiresIn: '1h' })
            return token;
        }
        else {
            throw new appError(500, "Username or password incorrect");
        }
    }

    async getData() {
        const Users = await user_info.findAll({
            include: [
                { model: user_address },
                { model: user_qualification },
            ]
        });
        return Users;
    }

    async create(data) {
        const t = await sequelize.transaction();
        try {
            const userInfo = await user_info.create(
                { ...data, Password: await bcrypt.hash(data.Password, 10) },
                { transaction: t }
            );
            const userAddress = await user_address.create(
                { ...data, User_info_id: userInfo.id },
                { transaction: t }
            );

            const userQualification = await user_qualification.create(
                { ...data, User_info_id: userInfo.id },
                { transaction: t }
            );

            await t.commit();
            return { userInfo, userAddress, userQualification }
        } catch (err) {
            await t.rollback();
            throw new appError(500, err.errors[0].message);

        }
    }

    async deleteUser(id) {
        const User = await user_info.findOne({
            where: {
                id: id
            }
        });

        if (!User) {
            return next(new appError(404, "User not found"));
        }

        return await user_info.destroy({
            where: {
                id: id
            }
        });

    }

    async update(UserId, data) {
        const UserInfo = await user_info.findOne({ where: { id: UserId } });

        if (!UserInfo) {
            throw new appError(404, "User not found");
        }

        const updatedUser = {
            ...data,
        };
        if (data.Password) {
            throw new appError(404, "User not able to update password, if you want to update click forgot password");
        }

        await UserInfo.update(updatedUser);

        const Useraddress = await user_address.findOne({ where: { User_info_id: UserId } });
        if (!Useraddress) {
            throw new appError(404, "User not found");
        }

        await Useraddress.update(data);

        const Userqulification = await user_qualification.findOne({ where: { User_info_id: UserId } });
        if (!Userqulification) {
            throw new appError(404, "User not found");
        }

        await Userqulification.update(data);

        const users = await user_info.findOne({
            where: { id: UserId },
            include: [
                { model: user_address },
                { model: user_qualification },
            ]
        });

        return users;
    }

    async fileUpload(UserId, resume) {
        const UserInfo = await user_info.findOne({ where: { id: UserId } });

        if (!UserInfo) {
            throw new appError(404, "User not found");
        }

        if (!resume) {
            throw new appError(404, "please upload file");
        }
        const updated = {
            Resume: resume ? await resume.filename : UserInfo.Resume,   // USING TERNARY OPERATOR 
        }
        return await UserInfo.update(updated);
    }


    async forgetPassword(Email, data) {
        const user = await user_info.findOne({ where: Email });

        const generateForgotPasswordEmail = (resetLink) => {
            return `
        <h1>Reset Your Password</h1>
        <p>Hello ${user.FirstName},</p>
        <p>You have requested to reset your password. Click on the link below to create a new password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Support Team</p>
      `;
        };
        if (!user) {
            throw new appError(404, "we could not find the user with the given email");
        }

        //2.GENERATE A RANDOM TOKEN
        var resetToken = crypto.randomBytes(32).toString('hex');

        user.RestToken = resetToken;
        user.save();

        //3.SEND THE TOKEN BACK TO THE USER EMAIL
        const resetUrl = `${data.protocol}://${data.get('host')}/reset_password/${resetToken}`;

        try {
            return await sendEmail({
                Email: user.Email,
                subject: 'password change request received',
                html: generateForgotPasswordEmail(resetUrl)
            });
        } catch (err) {
            throw new appError(500, "There was a error");
        }
    }

    async resetPassword(checkToken, data) {
        const user = await user_info.findOne({
            where: {
                RestToken: checkToken
            }
        });


        if (!user) {
            throw new appError(500, "Token is invalid");
        }

        user.Password = data.Password ? await bcrypt.hash(data.Password, 10) : user.Password;
        user.RestToken = null;

        user.save();

        const Email = user.Email;
        const token = jwt.sign({
            Email
        }, process.env.JWT_USER, { expiresIn: '1h' })
        return token;
    }

}

module.exports = adminService;