const express = require('express');
const userController = require('./../controllers/userController');
//----------------------------------->

//Router
const Router = express.Router();


Router.route('/signup').post(userController.signup);
Router.route('/login').post(userController.login);


//Export----------------------------->
module.exports = Router;