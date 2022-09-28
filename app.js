const express=require('express');
const cors = require('cors');
const homeRouter=require('./routes/homeRouter')

//----------------------------------->

//initialize app
const app = express();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/',homeRouter)

//Export----------------------------->
module.exports = app;