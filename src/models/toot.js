const db = require('../db');
const Record = require('./record');
const Image = require("./image")
const redis = require('../redis');

class Toot extends Record {
  static tableName() {
    return "toots";
  }

  static columns() {
    return ["user_id", "body","image_id","created_at","updated_at"];
  } 

  static insertColumns() {
    return ["user_id", "body", "image_id"];
  }

  static create(user, body, image) {
    if(image === undefined){
      return new this({ user_id: user.data.id, body: body})
      .save();
    }
    return new this({ user_id: user.data.id, body: body, image_id: image.data.id})
      .save();
  }

  image(){
    //image_id　から　imageをとって返す
    return Image.find(this.data.image_id);
  }

  insert() {
    let insertPromise = super.insert();
    return new Promise((resolve, reject) => {
      insertPromise.then((toot) => {
        let conn = redis();
        conn.publish(
          'local',
          JSON.stringify({
            action: "create",
            toot: this.asJSON()
          })
        );
        resolve(toot);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  destroy() {
    return new Promise((resolve, reject) => {
      let id = this.data.id
      super.destroy().then((toot) => {
        let conn = redis();
        conn.publish(
          'local',
          JSON.stringify({
            action: "delete",
            toot: { id: id }
          })
        );
        resolve(toot);
      }).catch((error) => {
        reject(error);
      })
    })
  }


}


module.exports = Toot;