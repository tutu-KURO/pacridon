// let express = require('express');
// let app = express();

// app.get('/', function (req, res) {
//   // res.send('Hello World!');
//   res.redirect(302, '/name');
  
// });

// app.get("/name", function(req, res) {
//     res.send("22")

// });
//   //302

// app.get("/show/:name",function(req, res) {
//     res.send("ID: " + req.params.name);
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });


let express = require('express');
let app = express();//ここ

let path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));//これでcssとかもいける

let morgan = require('morgan');
app.use(morgan('dev'));



let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));//ここ
let cookieParser = require('cookie-Parser');
app.use(cookieParser());
let methodOverride = require('method-override');
app.use(methodOverride('_method'));


let mysql =require('mysql');
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myBlog"
});
db.connect();
let mysqlPromise = require("mysql-promise");
let dbp = mysqlPromise()
dbp.configure({
  host: "localhost",
  user: "root",
  password: "",
  database: "myBlog"
}, mysql)

app.locals.db = db;
app.locals.dbp = dbp;


let route = require('./route');
route(app);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
