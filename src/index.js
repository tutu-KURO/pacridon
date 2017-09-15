const app = require('./app');
// app.listen(3000);

let path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
