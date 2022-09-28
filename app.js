const express=require('express');
const cors = require('cors');


//----------------------------------->

//initialize app
const app = express();


//middleware
app.use(express.json());
app.use(cors());



//Export----------------------------->
module.exports = app;