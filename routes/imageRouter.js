const express = require('express');
const imageController=require('../controllers/imageController');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(imageController.imageUpload.single('image'),imageController.addImage);
Router.route('/stats').get(imageController.getStats);

//Export----------------------------->
module.exports = Router;