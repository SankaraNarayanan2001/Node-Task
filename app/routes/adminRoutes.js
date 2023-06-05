
const router = require('express').Router();

const adminController=require('../controllers/adminControllers')

const {validateRegistration}=require('../middleware/validationCheck')

const jwt=require("../middleware/jwtcheck")

const upload=require('../middleware/Fileupload')
 

router.post('/login',validateRegistration, adminController.login);

router.get('/getdata',jwt.admin,adminController.getAllData);

router.post('/create',jwt.admin,upload.single('resume'),validateRegistration,adminController.create);

router.delete('/delete/:id',jwt.admin,adminController.deleteUser)

router.put('/update/:id',jwt.admin,upload.single('resume'), validateRegistration, adminController.update)



module.exports = router;





