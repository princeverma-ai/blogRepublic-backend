const mongoose = require('mongoose');
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: [true, "A Blog Title is required"]
    },
    blogDescription: {
        type: String,
        required: [true, "A Blog Description is required"]
    },
    blogText: {
        type: String,
        required: [true, "The Blog Text is required"]
    },
    blogCoverImage: {
        type: String,
        required: [true, "A Blog Cover Image is required"]
    },
    blogPostTime: {
        type: Date,
        required: [true, "Please specify the blog post time"]
    },
    blogPostedBy: {
        type: String,
        required: [true, "Please specify who is adding this blog"]
    }

});


//Model---------------------------->
const Model = mongoose.model('Blog', Schema);

//Export----------------------------->
module.exports = Model;