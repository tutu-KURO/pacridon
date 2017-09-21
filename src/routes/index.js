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
    //console.log(req.params.filename);//これでファイルネームを返せる
    Image.search_by_filename(req.params.filename).then((image) => {
      res.type(image.data.mime_type).send(image.data.data);
    }).catch((err) => {
      res.status(404).json({ error: err.toString() })
    });
  })

  require('./users')(app);
  // require('./articles')(app);

  require('./api')(app);

};

