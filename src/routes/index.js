const Image = require("../models/Image");

module.exports = function(app) {
  app.get("/", function(req, res) {

    if(!res.locals.currentUser){
      res.redirect('/login');
      return;
    }
  
    res.render("timeline");

  })

  app.get("/image/:filename",function(req,res){
    console.log(req.params.filename);//これでファイルネームを返せる
    Image.search_by_filename(req.params.filename).then((image) => {
      res.type(mimeType).send(image.data.data);
    }).catch(() => {
      res.status(404).send('no data');
    });
  })

  require('./users')(app);
  // require('./articles')(app);

  require('./api')(app);

};

