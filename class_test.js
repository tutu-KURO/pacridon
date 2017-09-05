// class Member {
//   //コンストラクター
//   constructor(firstName,lastName){
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   //メソッド
//   getName() {
//     return this.lastName + this.firstName;
//   }
// }

// let m =new Member('八幡','比企ヶ谷')
// console.log(m.getName());

//---------------------------------


// class Car {
//   constructor() {
//     this.fuel = 100;
//   }

//   drive() { /**/ }
//   stop() { /**/ }
// }
// let myCar = new Car()
// //new クラス(コンストラクタの引数)


// class Car {
//   constructor(params) {
//     console.dir(params);
//   }
// }

// new Car("test"); // => test と標準出力にでる
// new Car({ fuel: 100 }); // => どうなる？



// /*
// 例えば `Car` は `車という概念`です

// クラスは `概念` や `抽象` なのね

// なのでクラスにすることを `抽象化` といったりします

// `抽象のはしご` って前に言ったけど覚えてるかな

// `俺の車 <- 車 <- 乗り物 <- 物`

// みたいに、右に向かうにつれて抽象的な表現になっていくわかるかな 

// で、車の実例、実体あるものとして、『俺の車』があるわけですな

// なんで前の例を思い出すと

// `let myCar = new Car()`

// 俺の車は車のインスタンス、という表現になります
 
// 特定の何らかの文字列は `String` の実例(インスタンス)だし

// 特定の何らかの配列は `Array` の実例(インスタンス)なわけですな

// > [1, 2, 3] instanceof Array
// true

// `node` を起動してやってごらん

// `[object] instanceof [class]` で、 `object は class のインスタンスですか？` って意味合いになります

// */

//---------------------------

// class Car {
//   constructor(params) {
//     console.dir(params);
//     console.dir(this);
//   }
// }

// new Car("mine");

// //標準出力の一行目 これは、 `constructor` に渡った `params` の中身ですね
// //2行目 `constructor` の中での `this` の出力です
// //`Car {}` となってるけど
// //左端、 `Car` が、そのオブジェクトのクラス名ね
// //で、右の `{}` の中には、そのオブジェクトがプロパティを持っていれば、そのプロパティが出ます
// //てことでプロパティを付けてあげよう

// class Car {
//   constructor(params) {
//     this.name = params;
//     console.dir(params);
//     console.dir(this);
//   }
//   drive() {//driveメソッドを追加
//     console.log(this.name + "が走ってます");
//   }
// }
// let myCar = new Car("mine");
// myCar.drive();
// console.dir(Car.prototype.drive)
// console.dir(myCar.__proto__);
// console.dir(Car.prototype === myCar.__proto__);


// let car = new Car("mine");
// console.dir(car);





//`this.name = ...` でプロパティを設定してあげたので
//`Car` のインスタンスに `name` プロパティがついたね
//このように `new` でインスタンスを作る際の『一番最初の処理』いわゆる `初期化` を行うのが、 `constructor` です
//これで作ったオブジェクトにはちゃんと `name` プロパティが設定されてるはずなので
//`new Car` の戻り値を変数に保存して `console.dir` で出力してみよう
//

//`Car { name: 'mine' }` の出力に `drive` ないのわかるかな



// `myCar` は確かに `drive` を持っているはずなのに、出てこない 
// という状況
// まぁこれがもうホント何もかもの元凶で JS のオブジェクト指向がわかりにくくなる原因なのだが
// `myCar` つまりは `Car` のコンストラクタ内の `this` はですね、プロトタイプ(原型)として、 `Car` のインスタンスを持ってます
// `console.dir(myCar.__proto__);` こんなのを最後の行に足して実行すると
// なんのプロパティも持ってない `Car` のインスタンスが見えるはず
// で、じゃあ定義した drive くんはどこに居るかっていうと
// `Car.prototype.drive` にいます
// `Car` の `prototype(原型)` に `drive` メソッドがあるんすね

//このように`インスタンスそのものにあるプロパティ` と `インスタンスのプロトタイプにあるメソッド`というのがある
//プロパティは `constructor` の中で定義をして
//メソッドは `class` の定義の中でつけてあげる、って覚えてくれればいいから
//データは `constructor` 、振る舞い(メソッド)は `class` でもいいよ
//特に注記などを含まず、 `*** クラスのインスタンスを作って〜` というときは `new Class` してねって意味です

//`UserFollowing` のインスタンス作ってって言ったら
//`new UserFollowing` するって話

class Car {
  constructor(params) {
    this.name = params;
    console.dir(this.constructor === Car); // ここ
  }

  drive() {
    console.log(this.name + "が走ってます");
  }
}

let myCar = new Car("mine");
myCar.drive();