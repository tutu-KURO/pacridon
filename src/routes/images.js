const Image = require("../models/Image");

module.exports = function(app) {
  app.get("/images/:id",function(req,res){
    Image.find(req.params.id).then((image) => {
      res.type(image.data.mime_type).send(image.data.data);
    }).catch((err) => {
      res.status(404).json({ error: err.toString() })
    });
  })
};