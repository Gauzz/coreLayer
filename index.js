require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const mongoose = require('mongoose');
var userRoute = require('./routes/userRoute');
const { genericErrorHandler, unknownRoutesHandler } = require('./handlers/error/errorHandler');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DEV routes
app.use('/core/user', userRoute);

// this matches all routes and all methods
app.use(unknownRoutesHandler);
//Custom error handler. Always define at last
app.use(genericErrorHandler);


//mongo connection
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.promise = global.Promise;
const mongo = mongoose.connection;
mongo.on('error', error => { console.log('mongo: ' + error.name); });
mongo.on('connected', async () => { console.log('mongo: Connected'); });
mongo.on('disconnected', () => { console.log('mongo: Disconnected'); });

let port = process.env.NODE_PORT;
app.listen(port);
console.log(`Server started at port ${port}`);