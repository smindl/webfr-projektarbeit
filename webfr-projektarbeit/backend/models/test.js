const mongoose = require("mongoose");

const TestData = mongoose.Schema({
    testname: String,
});

module.exports = mongoose.model("TestData" , TestData);