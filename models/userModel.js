const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

//Hooks------------------------------------------------------------------>
Schema.pre('save', async function (next) {

    //check if password is modified or not...
    if (!this.isModified('password')) {
        return next();
    }

    //hash the password
    this.password = await bcrypt.hash(this.password, 12);

    next();

});

Schema.methods.correctPassword = async function (candidatePassword, userPassword) {

    //comparing the password
    return await bcrypt.compare(candidatePassword, userPassword);
}



//Model---------------------------->
const Model = mongoose.model('User', Schema);

//Export----------------------------->
module.exports = Model;