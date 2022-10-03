const express = require('express');
const userController = require('./../controllers/userController');
//----------------------------------->

//Router
const Router = express.Router();


Router.route('/signup').post(userController.signup);
Router.route('/login').post(userController.login);
Router.route('/logout').get(userController.logout);

Router.use(userController.protect);

Router.route('/').get(userController.getAllUsers);
Router.route('/:id').get(userController.getUser).post(userController.updateUser).delete(userController.deleteUser);



//Export----------------------------->
module.exports = Router;