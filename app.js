var express         = require('express');
var app             = express();
var cors            = require('cors')
var path            = require('path');
var fs              = require("fs");
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var flash           = require('express-flash');
var morgan          = require('morgan');
var rfs             = require('rotating-file-stream');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var MongoDBStore    = require('connect-mongodb-session')(session);
var io              = require('socket.io');
var validator       = require('express-validator');

//plugin bluebird promise for mongoose
mongoose.Promise = require('bluebird');

//set global app root path
var appData         = {};
appData.rootPath    = __dirname;
global.appData      = appData;

//set environment variables
require(appData.rootPath + '/env/env');

//enable cors for all routes
app.use(cors());

//set body parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// app.use( bodyParser.raw() );        // to support raw data

app.use(validator());

//setup logging
var logDirectory = appData.rootPath + '/logs/';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});
app.use(morgan({
    format:'default', 
    stream: accessLogStream
}));


// app.use(cookieParser());    // read cookies (needed for auth)
app.use(cookieParser('keyboard cat'));

//connect to mongodb via mongoose
mongoose.connect(process.env.DB_HOST, { useMongoClient: true })

//routes
require(appData.rootPath + '/routes/api')(app);

var server = app.listen(process.env.PORT);

module.exports = app;   //for testing