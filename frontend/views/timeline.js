const domready = require('domready')
const Vue = require('vue/dist/vue.min')


domready(function () {
  let timeline = document.getElementById('timeline');
  if (!timeline) {
    return;
  }

  let vm = new Vue({
    el: "#timeline",
    data: {
      newToot: { body: '' },
      toots: [],
      newImg: null,
    },
    methods: {
      postToot: function (event) {
        event.preventDefault();
        let fd = new FormData();
        fd.set('toot', this.newToot.body)//tootをsetしていて、（名前,中身）
        fd.set('img',this.newImg)//imgをsetしていて、（名前,中身）

        fetch('/api/toots', {
          credentials: 'same-origin',
          method: 'POST',
          body: fd
        }).then((response) => {
          return response.json();
        }).then((data) => {
          //console.log(data);
        }).catch((error) => {
          console.error(error);
        })
      },
      onSelectFile: function(event){
        this.newImg = event.target.files[0]
      },
      //toot消去
      deleteToot: function (event, id) {
        for (let i = 0; i < this.toots.length; i++) {
          if (this.toots[i].id === id) {
            this.toots.splice(i, 1);
            break;
          }
        }
        if (!event) { return }
        event.preventDefault();//デフォルトの挙動をしなくて良い

        //消してーって送る
        fetch('/api/toots/' + id, {
          credentials: 'same-origin',
          method: 'DELETE',
        }).then((data) => {
          //console.log(data);
        }).catch((error) => {
          console.error(error);
        })
      },
      //--全消し追加　9/24
      purgeToots: function(){
        this.toots = this.toots.filter(function(toot){
          return toot;
        });
        
        //このままだと他のユーザーのも消えてしまう！！

        for (let toot of this.toots) {
          fetch('/api/toots/' + toot.id, {
            credentials: 'same-origin',
            method: 'DELETE',
          }).then((data) => {
            //console.log(data);
          }).catch((error) => {
            console.error(error);
          })
        }

      }


    }
  });
  fetch('/api/toots', {
    credentials: 'same-origin'
  }).then((response) => {
    return response.json();
  }).then((data) => {
    data.map((toot) => {
      toot.created_at = new Date(toot.created_at);
      toot.updated_at = new Date(toot.updated_at);
      return toot;
    });
    vm.toots = data;
  }).catch((error) => {
    console.error(error);
  })

  let ws = new WebSocket("ws://localhost:3000/api/timeline");
  ws.addEventListener('message', function (event) {
    let message = JSON.parse(event.data);
    switch (message.action) {
      case "create":
        message.toot.created_at = new Date();
        vm.toots.unshift(message.toot);
        break;
      case "delete":
        vm.deleteToot(null,message.toot.id);
        break;
    }
    // vm.toots.unshift(JSON.parse(event.data));
  })
});