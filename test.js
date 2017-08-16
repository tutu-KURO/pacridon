// const User = require('./src/models/user');

// let user = new User({ nickname: "kuro"});
// user.save().then((u)=>{
//   console.log(u);
// });

// const Toot = require('./src/models/toot');

// for(let i= 0; i < 10;i++){
//   let toot = new Toot({user_id: 1,body:"にゃ"});
//   toot.save();
// }

// const User = require('./src/models/user');

// User.find(1).then((user)=>{
//   console.log(user);
//   user.toots().where({id:3}).then((toots)=>{
//     console.log(toots.length);
//     console.log(toots);
//   });
// })

const UserSession = require('./src/models/user_session');

let session = new UserSession({user_id: 1});
session.save().then((s)=>{
  console.dir(s);
  s.data.user_id = 3;
  s.save().then((ss)=>{
    console.dir(ss);
  })
})