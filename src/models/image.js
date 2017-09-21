const db = require('../db')
const crypto = require('crypto');
const Record = require("./record")

class Image extends Record {
  static tableName() {
    return "images";
  }

  static columns() {
    return ["image_id", "data", "filename"];
  }

  static search_by_filename(filename){
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `images` WHERE `filename` = ?",
        [filename]
      ).then((result) => {
        console.log(result)
        let rows = result[0];
        let fields = result[1];
        if(rows.length < 1) {
          reject(new Error(`${this.name}(${filename}) is not found`));
          return;
        }
        resolve(new this(rows[0]));
      }).catch((error) => {
        reject(error);
      })
    });
  }

  static create(data, mimetype) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(data);
    let hash = sha256.digest('base64').replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/,"");
    let mimeType = mimetype.replace(/\image\//g,"");
    console.log(mimeType)
    return new this({ data: data, filename: hash, mimeType })
      .save();
  }
 
}

module.exports = Image;