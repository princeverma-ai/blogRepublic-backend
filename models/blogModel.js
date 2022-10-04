const mongoose = require('mongoose');
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema({
    blogTitle: {
        type: String,
    },
    blogDescription: {
        type: String,
    },
    blogText: {
        type: String,
    },
    blogCoverImage: {
        type: String,
    },
    blogPostTime: {
        type: Date,
    },
    blogPostedBy: {
        type: String,
    },
    draft:{
        type:Boolean,
        default:false;
    }

});


//Model---------------------------->
const Model = mongoose.model('Blog', Schema);

//Export----------------------------->
module.exports = Model;