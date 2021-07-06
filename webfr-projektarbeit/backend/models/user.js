const mongoose = require("mongoose");

const UserData = mongoose.Schema({
    email : String,
    username : String,
    password : String,
    highscore : {type : Number, default : 0},
    
    company : String,
    street : String,
    city : String,
    postcode : Number
    


});

module.exports = mongoose.model("UserData" , UserData);