const router=require('express').Router();

const jwt=require('../middleware/jwtcheck');

const userController=require('../controllers/userControllers');

const validation=require('../middleware/validationCheck')

router.post('/loginuser',userController.loginUser);

router.get('/getUser',jwt.user,validation.validateRegistration,userController.getUser)

module.exports=router;