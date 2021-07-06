const { urlencoded } = require("express");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const UserData = require("./models/user");
const TestData = require("./models/test");
const user = require("./models/user");

mongoose.connect("mongodb+srv://Admin:WebFrameworks@webframeworksdb.uur4x.mongodb.net/WebFrameworksDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("connection to DB successfull")
    })
    .catch(() => {
        console.log("connection to DB failed")
    });


const app = express();

app.use(cors());

app.use(express.json());

app.use(urlencoded({
    extended: false
}));

app.post('/test', function (req, res, next) {
    
    const userData = new UserData({
        username : "Testuser 5",
        password : "test1234",
        company : "FHTW",
        street : "Teststreet",
        city : "Testcity",
        postcode : "1234"
    });
    userData.save();
    console.log("Data saved")

    res.status(200).json({
        message: userData.username
    });


});

app.get('/test',async function (req, res, next) {
    
    let entries = await TestData.find()
    let alltests = ""

    entries.forEach(entrie => {
        alltests += (entrie.testname + "\n")
    });

    if(alltests == "") {
        alltests = "No Tests"
    }

    res.status(200).json({
        message : alltests
    });


});

app.get('/highscore',async function (req, res, next) {
    
    let entries = await UserData.find()
    let data = []
    var i = 1

    entries.sort((a,b) => (b.highscore > a.highscore) ? 1 : ((a.highscore > b.highscore) ? -1 : 0))

    entries.forEach(entrie => {
       data.push({
            username : entrie.username,
            score : entrie.highscore,
            position : i
       })
       i++;
    });

    data.slice(0,9)

    if(entries.length == 0) {
        data = "No Data"
    }

    res.status(200).json({
        data : data
    });


});

app.post('/signup',async function (req, res, next) {
    
    usercheckMail = await UserData.find({email : req.body.email})
    usercheckName = await UserData.find({username : req.body.username})

    if(usercheckMail.length > 0) {
        res.status(200).json({
            message: "Email already in use"
        });
    }
    else if(usercheckName.length > 0) {
        console.log("Test2")
        res.status(200).json({
            message: "Username already in use"
        });
    }
    else {
        const userData = new UserData({
            email : req.body.email,
            username :  req.body.username,
            password :  req.body.password,
            company :  req.body.company,
            street :  req.body.street,
            city :  req.body.city,
            postcode :  req.body.postcode
        });
        userData.save();
        console.log("Data saved")

        res.status(201).json({
            message: "New User " + userData.username
        });
    }

});

module.exports = app;