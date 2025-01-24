const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const app = express()
const connectToDB = require('./db/db')
const userRoute = require('./routes/user.routes')
connectToDB()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("helo")
})

app.use('/users',userRoute)

module.exports = app;