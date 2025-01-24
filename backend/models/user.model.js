const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required : true,
            minlength : [3,"First name must be atleast 3 character long "] 
        },
        lastname:{
            type: String,
            minlength : [3,"Last name must be atleast 3 character long "]
        }
    },
    email : {
        type : String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 character long']
    },
    password : {
        type : String,
        required: true,
        select : false // user ko kabhi bhi find krte time bydefault ab ye field nhi jayegi
    },
    socketId:{
        type:String
    }
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
} //it is a static method, Static methods are methods that are called directly on the model itself, rather than on an individual instance of the model. These are like "class methods" in object-oriented programming.



const userModel = mongoose.model("user",userSchema);

module.exports = userModel;