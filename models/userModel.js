const mongoose = require('mongoose');
//----------------------------------->


//Schema---------------------------->
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name is reqiuired"]
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        select: false
    },
    userPhoto: {
        type: String,
        required: [true, "Please provide the photo"],
    },
});

//Model---------------------------->
const Model = mongoose.model('User', Schema);

//Export----------------------------->
module.exports = Model;