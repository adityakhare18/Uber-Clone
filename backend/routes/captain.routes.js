const express = require('express')
const route = express.Router();
const { body } = require('express-validator')
const captainController = require('../controller/captain.controller')
const authMiddleware = require('../middleware/auth.middleware')



route.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

route.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long')
],

captainController.loginCaptain);

route.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

route.get('/logout', authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = route;