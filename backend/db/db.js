const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error connecting to Database:", err));
}

module.exports = connectToDB;
