const db = require('../db')
const crypto = require('crypto');
const Record = require("./record")

class Image extends Record {
  static tableName() {
    return "images";
  }

  static columns() {
    return ["data", "filename", "mime_type"];
  }

  static search_by_filename(filename) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `images` WHERE `filename` = ?",
        [filename]
      ).then((result) => {
        //console.log(result)
        let rows = result[0];
        let fields = result[1];
        if (rows.length < 1) {
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
    let hash = sha256.digest('base64').replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/, "");
    return new this({ data: data, filename: hash, mime_type: mimetype }).save(); 
  }

  base64() {
    let buf = new Buffer(this.data);
    return buf.toString('base64');
  }
}

module.exports = Image;