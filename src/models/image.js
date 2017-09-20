const db = require('../db')
const crypto = require('crypto');
const Record = require("./record")

class Image extends Record {
  static tableName() {
    return "images";
  }

  static columns() {
    return ["image_id", "data","filename"];
  }

  static search_by_filename(filename){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `images` WHERE `filename` = ?",
        [filename]
      )
    });
  }

  static create(data) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(data);
    let hash = sha256.digest('base64').splice(/\+/g,"-").splice(/\//g,"_").splice(/\=/,"");

    return new this({ data: data, filename: hash })
      .save();
  }
 
}

module.exports = Image;