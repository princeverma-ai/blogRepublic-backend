const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
//----------------------------------->

//configuration
dotenv.config({ path: './config.env' });

//connection to database------------------------------------------->

mongoose.connect(process.env.URIREMOTE, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection to database eshtablished 👌");
}).catch(err => {
    console.log(err);
})


//server listening------------------------------------------------->
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port} 👍`);
})

