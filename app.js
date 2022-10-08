const express = require('express');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')

const homeRouter = require('./routes/homeRouter');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const imageRouter=require('./routes/imageRouter');
//----------------------------------->

//initialize app
const app = express();


//middleware
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize())
app.use(xss());
app.use(hpp());
app.use(compression()) 

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));
app.use(express.static('public'));

//routes
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/image',imageRouter);

//Export----------------------------->
module.exports = app;