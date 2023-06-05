const user_info = require("../models/user_info");

const user_address=require('../models/user_address');

const user_qualification=require('../models/user_qulification')

const jwt=require('jsonwebtoken');

const bcrypt = require('bcrypt');

const loginUser= async (req, res) => {

  
  const { Email, Password } = req.body;


  if (!Email || !Password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
 
  const UserId = await user_info.findOne({where:{Email}});

  if (!UserId|| UserId.id=='1') {
   return  res.status(404).send({ message: 'User not found' });
  }
 
  const passwordcompare = await bcrypt.compare(Password, UserId.Password)

  if (Email === UserId.Email && passwordcompare) {

    const token = jwt.sign({
      Email
    }, 'UserKey')

    res.json({ token })


  }
  else {
    res.status(500).json({ message: 'Username or password incorrect' })
  }
}


const getUser=async (req,res)=>{

    const Email=req.user
    try {
      const users = await user_info.findOne({
        where:{Email},
        include: [
          { model: user_address },
          { model: user_qualification },
        ]
      });
        return res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
module.exports={loginUser,getUser};