const { urlencoded } = require("express");
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(express.json());

app.use(urlencoded({
    extended: false
}));

app.get('/test', function (req, res, next) {
    
    let testmessage = "Test successfull"

    res.status(200).json({
        message: testmessage
    });


});

module.exports = app;