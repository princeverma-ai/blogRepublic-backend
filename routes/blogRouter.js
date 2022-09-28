const express = require('express');
const blogController = require('./../controllers/blogController')
//----------------------------------->

//Router
const Router = express.Router();


Router.route('/').post(blogController.addBlog);



//Export----------------------------->
module.exports = Router;