const db = require('../db')
const crypto = require('crypto');

class Images extends Record {
  static tableName() {
    return "images";
  }

  static columns() {
    return ["images_id", "data","filename"];
  }


  static create(data) {

    let sha256 = crypto.createHash('sha256');
    sha256.update(data);
    let hash = sha256.digest('base64').splice(/\+/g,"-").splice(/\//g,"_").splice(/\=/,"");

    return new this({ data: data, filename: hash })
      .save();
  }
 
}