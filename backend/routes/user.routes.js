const express = require('express')
const router = express.Router();
const { body } = require('express-validator') // kissi bhi data to validate krne ke liye i installed express-validator package
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),//body ke ander jo email h usko check
    body('fullname.firstname').isLength({min : 3}).withMessage("First name must be atleast 3 character long"),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long')
],
userController.registerUser
)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be 6 character long")
],
userController.login
)

router.get('/logout',authMiddleware.authUser,userController.logout);



module.exports = router;