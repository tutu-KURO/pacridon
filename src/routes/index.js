module.exports = function(app) {
  app.get("/", function(req, res) {

    if(!res.locals.currentUser){
      res.redirect('/login');
      return;
    }
  
    res.render("timeline");

  })

  app.get("/image/:filename",function(req,res){
    req.params.filename;
    

    res.send()
  })

  require('./users')(app);
  // require('./articles')(app);

  require('./api')(app);

};

