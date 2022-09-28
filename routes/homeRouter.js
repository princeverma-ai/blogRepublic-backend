const express=require('express');
const homeController=require('./../controllers/homeController')
//----------------------------------->

//Router
const Router = express.Router();


Router.route('/').get(homeController.getData);


//Export----------------------------->
module.exports = Router;