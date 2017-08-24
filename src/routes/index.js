module.exports = function(app) {
  app.get("/", function(req, res) {
    // console.log(req.cookies.session_id);
    //console.log(req.signedCookies.session_id);
    // res.send("Initialized!:" + req.signedCookies.session_id);
    if(!res.locals.currentUser){
      res.redirect('/login');
      return;
    }
  
    res.render("timeline");

  })

  require('./users')(app);
  // require('./articles')(app);

  require('./api')(app);

};

