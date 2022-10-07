const express = require('express');
const blogController = require('./../controllers/blogController')
//----------------------------------->

//Router
const Router = express.Router();


Router.route('/').post(blogController.addBlog).get(blogController.getAllBlogs);
Router.route('/:id').get(blogController.getBlog).patch(blogController.updateBlog).delete(blogController.deleteBlog);



//Export----------------------------->
module.exports = Router;