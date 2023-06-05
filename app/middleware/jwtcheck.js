const jwt = require("jsonwebtoken");
require('dotenv').config();

const admin=  (req, res, next) => {
    const token = req.header('token')

    // CHECK IF WE EVEN HAVE A TOKEN
    if(!token){
       return  res.status(400).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_ADMIN)
        req.user = user.Email;
        next();
    } catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        })
    }
}

const user =  (req, res, next) => {
    const token = req.header('token')

    // CHECK IF WE EVEN HAVE A TOKEN
    if(!token){
       return  res.status(400).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_USER)
        req.user = user.Email;
        next();
    } catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        })
    }
}

module.exports={admin,user}