const express = require('express');

let app = express();

const expressWs = require('express-ws');
expressWs(app);

//ミドルウェアセッティング
const path = require('path');
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.resolve(__dirname,'../public')));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser("kuro"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.locals.db = require('./db')

const filters = require('./filters');
filters(app);

let routes = require('./routes');
routes(app);

module.exports = app;