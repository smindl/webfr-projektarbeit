const mongoose = require("mongoose");

const UserData = mongoose.Schema({
    username : String,
    password : String,
    highscore : Number,
    
    company : String,
    street : String,
    city : String,
    postcode : Number
    


});

module.exports = mongoose.model("UserData" , UserData);