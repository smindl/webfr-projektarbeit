const mongoose = require("mongoose");

const UserData = mongoose.Schema({
    email : String,
    username : String,
    password : String,
    highscore : {type : Number, default : 0},
    
    company : {type : String, default : "unbekannt"} ,
    street : {type : String, default : "unbekannt"},
    city : {type : String, default : "unbekannt"},
    postcode : {type : Number, default : 0000}
    


});

module.exports = mongoose.model("UserData" , UserData);