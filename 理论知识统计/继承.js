//****原型链继承*****
function Person() {
    this.name = 'dayuan'
}
Person.prototype.getName = function () {
    console.log(this.name)
}

function Child() {

}
Child.prototype = new Person();
var child1 = new Child();
console.log(child1.name);
/**
 * 缺点
 * 1. 如果属性是引用类型，那么属性共享
 * 2. 不能给Person传递参数
 */

//****构造函数继承****
function Child() {
    Person.call(this, arguments)
}
/**
 * 优点
 * 1. 解决了属性共享和不能给person传递参数的
 * 缺点
 * 1. 不能继承原型对象上面的属性，无法实现函数方法的复用
 * 2. 方法都在构造函数中定义，每次创建实例都会创建一遍方法，占有空间
 */


//**** 组合式继承 ****/

/**
 * 使用原型链对方法的继承
 * 使用构造函数对属性的继承
 * 也有小毛病，调用两次构造函数，多了许多不必要的属性，所以叫伪经典继承
 */
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name); // 第二次调用 Parent()
    this.age = age;
}

Child.prototype = new Parent(); // 第一次调用 Parent()

var child1 = new Child('xiaopao', 18);
var child2 = new Child('lulu', 19);
child1.getName(); // xiaopao
child2.getName(); // lulu
console.log(child1.age); // 18
console.log(child2.age); // 19
child1.colors.push('yellow');
console.log(child1.colors); // ["red", "blue", "green", "yellow"]
console.log(child2.colors); // ["red", "blue", "green"]
console.log(child1 instanceof Child); // true
console.log(child1 instanceof Parent); // true

/**** 原型继承 ****/
/**
 * 基于已有对象来创建新的对象，返回一个以这个对象为原型的对象
 * 缺点与原型链的相同
 */
function CreateObj(o) {
    function F() {}
    F.prototype = o;
    console.log(o.__proto__ === Object.prototype);
    console.log(F.prototype.constructor === Object); // true
    return new F();
}

var person = {
    name: 'xiaopao',
    friend: ['daisy', 'kelly']
}

var person1 = CreateObj(person);

/** 寄生式继承 */
/** 
 * 思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。
 * 优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。
 * 缺点是没有办法实现函数的复用。
 */
// 寄生式继承  可以理解为在原型式继承的基础上增加一些函数或属性
var ob = {
    name: 'xiaopao',
    friends: ['lulu', 'huahua']
}

function CreateObj(o) {
    function F() {}; // 创建一个构造函数F
    F.prototype = o;
    return new F();
}

// 上面CreateObj函数 在ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的 , 看下面代码
var ob1 = CreateObj(ob);
var ob2 = Object.create(ob);
console.log(ob1.name); // xiaopao
console.log(ob2.name); // xiaopao

function CreateOb(o) {
    var newob = CreateObj(o); // 创建对象 或者用 var newob = Object.create(ob)
    newob.sayName = function () { // 增强对象
        console.log(this.name);
    }
    return newob; // 指定对象
}

var p1 = CreateOb(ob);
p1.sayName(); // xiaopao 

/** 组合寄生式继承 */
/**
 * 子类构造函数复制父类的自身属性和方法，子类原型只接收父类的原型属性和方法
 * 所谓寄生组合继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
 * 其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型的原型的一个副本而已。
 * 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给予类型的原型。
 */

 // 寄生组合式继承
function Parent(name){
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function(){
    console.log(this.name);
}

function Child(name,age){
    Parent.call(this,name); 
    this.age = age;
}

function CreateObj(o){
    function F(){};
    F.prototype = o;
    return new F();
}

// Child.prototype = new Parent(); // 这里换成下面
function prototype(child,parent){
    var prototype = CreateObj(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
prototype(Child,Parent);

var child1 = new Child('xiaopao', 18);
console.log(child1); 


