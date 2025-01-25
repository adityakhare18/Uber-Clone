const userModel = require('../models/user.model');
const userService = require('../services/user.services')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model');



module.exports.registerUser = async (req,res,next)=> {
    const errors = validationResult(req);

    if(!errors){
        return res.status(400).json({errors: errors.array() })
    }

    const { fullname, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message:'User already exist'});
    }

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    return res.status(200).json({token, user});
}

module.exports.login = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token',token)

    return res.status(200).json({token, user});

}

module.exports.getProfile = async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');

        // Extract the token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'No token provided for logout' });
        }

        // Blacklist the token
        await blacklistTokenModel.create({ token });

        // Send success response
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
