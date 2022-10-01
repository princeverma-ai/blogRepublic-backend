const express = require('express');
const cors = require('cors');
const homeRouter = require('./routes/homeRouter');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const imageRouter=require('./routes/imageRouter');
//----------------------------------->

//initialize app
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//routes
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/image',imageRouter);

//Export----------------------------->
module.exports = app;