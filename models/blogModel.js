const mongoose = require('mongoose');
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema({
    blogTitle: {
        type: String,
        default: "Untitled"
    },
    blogDescription: {
        type: String,
        default: "No description"
    },
    blogText: {
        type: String,
        default: "No text"
    },
    blogCoverImage: {
        type: String,
        default:"No image"
    },
    blogPostTime: {
        type: Date,
        
    },
    blogPostedByUserName: {
        type: String,
        default: "Anonymous"
    },
    blogPostedByUserImage:{
        type: String,
        default: "No image"
    },
    blogPostedByUserId:{
        type: String,
    },
    draft:{
        type:Boolean,
        default:false
    }

});

//hooks----------------------------->
Schema.pre('save', function (next) {
    this.blogPostTime = Date.now();
    
    next();
})


//Model---------------------------->
const Model = mongoose.model('Blog', Schema);

//Export----------------------------->
module.exports = Model;