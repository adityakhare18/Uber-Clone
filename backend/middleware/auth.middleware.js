const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        // Get the token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const isBlackListed = await userModel.findOne({ token: token });
        if(isBlackListed){
            res.status(401).json({message: 'Unauthorized'})
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware
        return next();
    } catch (error) {
        // Handle token verification errors or database errors
        return next(error);
    }
};
