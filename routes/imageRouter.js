const express = require('express');
const imageController=require('../controllers/imageController');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(imageController.imageUpload.single('image'),imageController.addImage);

//Export----------------------------->
module.exports = Router;