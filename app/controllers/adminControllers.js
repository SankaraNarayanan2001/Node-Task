const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const user_qualification = require('../models/user_qulification')

const user_address = require('../models/user_address');

const user_info=require('../models/user_info')

//LOGIN
const login = async (req, res) => {

  const { Email, Password } = req.body;

  if (!Email || !Password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const User = await user_info.findOne();

  const passwordcompare = await bcrypt.compare(Password, User.Password)

  if (Email === User.Email && passwordcompare) {

    const token = jwt.sign({
      Email
    }, 'AdminKey',{expiresIn:'1h'})

    res.json({ token })

  }
  else {
    res.status(500).json({ message: 'Username or password incorrect' })
  }
}

//GETALLDATA
const getAllData = async (req, res) => {

  try {
    const Users = await user_info.findAll({
      include: [
        { model: user_address },
        { model: user_qualification },
      ]
    });
    return res.json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//CREATEUser
const create = async (req, res) => {

  try {

    const { FirstName, LastName, FatherName, MotherName, DateOfBirth, Nationality, Email, Password, Gender, PhoneNumber, Occupation, Native_Place, First_Language, Address, City, State, Country, PostalCode, Degree, Institution, Skills ,Graduation_Year,FieldOfStudy,Grade} = req.body;
    const resume = req.file;

    const UserInfo = await user_info.create({
      FirstName,
      LastName,
      FatherName,
      MotherName,
      DateOfBirth,
      Nationality,
      Email,
      Password: await bcrypt.hash(Password, 10),
      Gender,
      PhoneNumber,
      Occupation,
      Native_Place,
      First_Language,
      Resume: resume.filename,

    });
    await user_address.create({
      Address,
      City,
      State,
      Country,
      PostalCode,
      User_info_id: UserInfo.id,

    });

   await user_qualification.create({
      Degree,
      Institution,
      Skills,
      Graduation_Year,
      FieldOfStudy,
      Grade,
      User_info_id: UserInfo.id,


    });

    res.status(201).json({
      success: true,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating User',
      error: error.message
    });
  }

}

//delete
const deleteUser = async (req, res) => {
  const id = req.params['id'];

  try {
    const User = await user_info.findOne({
      where: {
        id: id
      }
    });

    if (!User) {
      res.status(404).json({message:'User not found'});
      return;
    }

     await user_info.destroy({
      where: {
        id: id
      }
    });

    res.json({message:'user successfully deleted'})
  } catch (error) {
    res.status(500).json({message:'Error deleting row'});
  }
};


//udate user
const update = async function (req, res) {
  try {
    const UserId = req.params['id'];

    const UserInfo = await user_info.findOne({ where: { id: UserId } });

    if (!UserInfo) {
      return res.status(404).json({message:"User info not found"});
    }

    const {
      FirstName,
      LastName,
      FatherName,
      MotherName,
      DateOfBirth,
      Nationality,
      Email,
      Password,
      Gender,
      PhoneNumber,
      Occupation,
      Native_Place,
      First_Language,
      Address,
      City,
      State,
      Country,
      PostalCode,
      Degree,
      Institution,
      Skills,
      Graduation_Year,
      FieldOfStudy,
      Grade
    } = req.body;
    const resume = req.file;


    const updatedUser = {
      FirstName ,
      LastName,
      FatherName,
      MotherName ,
      DateOfBirth ,
      Nationality ,
      Email,
      Password: Password ? await bcrypt.hash(Password, 10) : UserInfo.Password,   // using ternary operator 
      Gender,
      PhoneNumber,
      Occupation,
      Native_Place,
      First_Language,
      Resume:  resume ? await resume.filename : UserInfo.Resume,   // using ternary operator 
        };

    await UserInfo.update(updatedUser);

    const Useraddress = await user_address.findOne({ where: { User_info_id: UserId } });
    if (!Useraddress) {
      return res.status(404).json({message:"User address not found"});
    }

    const updatedUserAddress = {
      Address,
      City,
      State,
      Country,
      PostalCode
    };

    await Useraddress.update(updatedUserAddress);

    const Userqulification = await user_qualification.findOne({ where: { User_info_id: UserId } });
    if (!Userqulification) {
      return res.status(404).json({message:"User qualification not found"});
    }

    const updatedUserQualification = {
      Degree,
      Institution,
      Skills,
      Graduation_Year,
      FieldOfStudy,
      Grade
    };

    await Userqulification.update(updatedUserQualification);

    res.status(200).json({ message: "User updated successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in update data' });
  }
};


module.exports = { getAllData, login, create, deleteUser, update };
