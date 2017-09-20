const Toot = require('../../models/toot');
const Image = require('../../models/image');
let express = require('express')
let multer  = require('multer')
let storage = multer.memoryStorage()
var upload = multer({ storage: storage })

module.exports = function (app) {
  app.get('/api/toots', function (req, res) {
    if (!res.locals.currentUser) {
      res.status(401).json({ "error": "Unauthorized" });
      return;
    }

    res.locals.currentUser.toots().order('id', 'desc').then((toots) => {
      res.json(toots.map((toot) => {
        return toot.data;
      }));
    }).catch((error) => {
      res.status(500).json({ error: error.toString() });
    });
  });

  app.post('/api/toots', upload.single('img') ,function (req, res) {
    //ここからイメージを作る　モデルで作ったやつを
    Image.create(req.file.image).then((image) => {
      return Toot.create(res.locals.currentUser, req.body.toot, image);
    }).then((toot) => {
      toot.data.created_at = new Date();
      res.json({ toot: toot.data ,image: image.filename});
    }).catch((err) => {
      res.status(500).json({ error: err.toString() })
    });
  });

  app.delete('/api/toots/:id',function(req,res){//tootがいっこくる
    if (!res.locals.currentUser) {
      res.status(401).json({ "error": "Unauthorized" });
      return;
    }

    res.locals.currentUser.toots().where({
      id: req.params.id
    }).then((toots)=>{
      if(toots.length > 0){
        toots[0].destroy();
      }
      res.status(200).end();
    }).catch((error)=>{
      res.status(500).json({"error": error.toString()});
    })
  });
};