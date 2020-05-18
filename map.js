// 配合入门专家阮一峰的看看----------------------

// 通常我们写js对象的时候，会发现健都是字符串
let test = {
  name: 'test'
}
// 这里字符串1会把数字1覆盖了
let obj = {
  1: 'lmz',
  '1': 'yzy',
  // 这里把test对象当作键，怎么访问呢,其实把对象toString()
  // 所以传统的对象就有一问题，他做不了键名
  [test]: 'my name is test'
}

// 请问一下输出什么？
console.log(obj)
console.log(obj[test.toString()])



// map集合
// 键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
// Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

// map解决了什么问题？
// map有哪些常用的方法： set  get  has  delete 
// 什么类型的数据可以当作Map构造函数的参数？ 数组，set， Map都可以， 具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

console.log(m.get(o), m.has(o))

m.has(o) // true
m.delete(o) // true
m.has(o) // false


// map还可以接收数组,数组中还是数组，子数组有两个元素，第一个是键，第二个是值

const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

console.log(map.has('name'))
console.log(map.get('name'))

//  map还可以接收数组,
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
// map也可以注意这里
const m3 = new Map(m2);
m3.get('baz') // 3




// 如果get一个未知的键，则返回undefined。-----------------------
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
// 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，
// 因此get方法无法读取该键，返回undefined。
// Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，
// 我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。



//如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
// 比如0和-0就是一个键，
// 布尔值true和字符串true则是两个不同的键。
// undefined和null也是两个不同的键。
// 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123


// 遍历方法
// Map 结构原生提供三个遍历器生成函数和一个遍历方法。

// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。


for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"



// 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}





// WeakMap只有四个方法可用：get()、set()、has()、delete()。
// WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
// WeakMap的键名所指向的对象，不计入垃圾回收机制。
// WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。