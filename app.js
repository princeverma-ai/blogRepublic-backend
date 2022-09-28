const express = require('express');
const cors = require('cors');
const homeRouter = require('./routes/homeRouter');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
//----------------------------------->

//initialize app
const app = express();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);

//Export----------------------------->
module.exports = app;