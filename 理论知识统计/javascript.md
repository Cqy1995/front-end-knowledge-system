## Javascript

### 函数的调用

-  作为独立函数调用，在非严格模式下 this 指向 windows，严格模式下指向 underfind。  
-  作为对象的方法调用，this 指向该对象。  
-  作为构造函数调用，看是独立函数调用还是属于方法调用。(因为构造函数**指向**的是使用构造函数的**实例**)  
-  apply,call,bind  
   - 相同点：可以改变 this 指向，第一次参数都是 this 要指向的对象，都可以利用后续参数进行传参。  
   - 不同点：apply,call 是对函数的直接调用，bind 是返回一个函数，不直接调用，需要再次调用。

箭头函数  
- 写法简洁,是匿名函数.
- this指向不同，永远指向其上下文的this,任何方法都改变不了其this(apply,call,bind)
- 没有arguments对象,平常开发中使用rest参数...来进行参数的使用
- 不能用于构造函数,不能使用new操作符,因为没有prototype,([new 都发生了什么?](#new))
- 没有 new.target,不存在变量提升

**拓展**
<div id="new">new 都发生了什么？？<div>

1. 创建一个新对象
2. 构造函数的作用域给了新对象
3. 执行构造函数中的代码
4. 返回新对象
```
   function Person(name){this.name = name}
   const lydia = new Person('zs')
   const sarah = Person('ls')
   console.log(lydia,sarah) 
   /*
   *返回结果
   *Person {name: "zs"} undefined
   */ 
   let newobj = {};
   newobj._proto_ = Person.prototype(this指向了新对象)
   this.name = 'zs'
   return {name:'zs'}
   //注意:不添加new 它指的是全局对象,global.name = 'ls',本身没有返回值，所以是undefined
```
**立即执行函数：函数创建后立即执行，作用就是能创建一个独立的作用域**

#### 内置函数
在代码执行前，js定义在全局作用域的内置的属性，函数与构造函数。  
全局属性常见的有NaN，Undefined  
全局函数有parseFloat,parseInt  
全局构造函数有Object，Date,Math  


### 闭包

变量：用于存储数据的容器；  
标识符：代码中用来标识变量、函数、或属性的字符序列。  
执行上下文：评估和执行 JavaScript 代码的环境的抽象概念。（全局，函数，eval 函数）。  
词法作用域：JavaScript **从标识符到变量的映射机制**，在词法分析阶段生成的作用域，词法分析阶段，就可以理解为写代码阶段。  
闭包：由于浏览器的垃圾回收机制，在 JavaScript 中，函数是第一公民，所以函数可以被当作一个普通的变量传递，所以函数在运行时可能会看起来已经脱离了原来的词法作用域。但是由于函数的作用域早就在词法分析时就确定了，所以函数无论在哪里执行，都会记住被定义时的作用域。这种现象就叫作闭包。  
***闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。***  
本来是函数执行完毕，执行环境销毁，对应的变量对象销毁，但是当 A 函数内的 B 函数将 A 函数的活动对象添加到他的活动对象，当 B 被全局变量接受不了后，A 函数内部的活动对象就不会消失，因此就可以访问到 A 函数内部变量；  
注意：它只能取得这个变量的最后最终值  
重点：一定要函数返回配合匿名函数；  
备注：垃圾回收机制：为了防止内存泄漏，浏览器会周期性的清理用不到的内存（变量）。

闭包的使用场景：封装功能是（需要私有变量方法时）。  
防抖函数，节流函数，柯里化函数，在循环中给元素绑定事件。

闭包的优缺点：  
优点：闭包减少全局变量，可重复使用，避免变量污染。
缺点：闭包比普通函数内存大，影响性能，在 IE 下容易造成内存泄露。

#### 综上所述,😊 闭包是词法作用域和函数是 JavaScript 的第一公民相互所用自然而然产生的现象。

### 原型与继承

!['Prototype img'](https://raw.githubusercontent.com/Cqy1995/front-end-knowledge-system/main/images/prototype.png)   
每个函数都有 prototype 属性，指向原型对象。  
每个对象有个**proto**属性，指向该对象的原型。（普通对象没有 prototype 属性）。

```
function Person() {}
var person = new Person();
person.__proto__ === Person.prototype
实例的 __proto__ 指向构造函数的 prototype 
```

原型的概念：对象创建，就会与之关联另一个对象，这个对象就是原型，每一个对象都会从原型中“继承”属性。  
每个原型都有一个 constructor 属性，指向该关联的构造函数。

```
Person===Person.prototype.constructor(constructor是prototype上的属性，这一点很容易被忽略掉。)
person instanceof Person ==> true
constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；
而instanceof比较松散，只要检测的类型在原型链上，就会返回true。
```
#### 最优继承
```
function Person(name){
   this.name = name;
}
Person.prototype.say = function(){
   console.log(`my name is ${this.name}`)
}
function Student(){
   Person.call(this,name)
}
//创建新对象,student的原型对象变成Person的原型对象，也就有了person的say方法。
Student.prototype = Object.create(Person.prototype);
//修改构造函数指向（上面修改prototype,同时constrcuctor也被修改成proson的构造函数（因为constrcuctor是prototype上面的一个属性），所以要把constructor变成学生自己的构造函数）
Student.prototype.constrcuctor = Student;

var stu = new Stuent("tom");
stu.say() //my name is tom 
```

### 异步函数与 promise

宏任务：同步 script（整体代码），setTimeout 回调函数，setInterval 回调函数，I/O,UI renderding。  
微任务： process.nextTick, Promise 回调函数，Object.observe，MutationObserver。  
代码执行顺序：  
1，执行整体代码。进入栈中。  
2，如果发现微任务，把微任务放在微任务队列中。  
3，继续执行同步代码，同步代码（本次宏任务）执行完毕后，执行微任务，微任务队列清空。  
4，上一个宏任务出栈，进入下一个宏任务。  
5，如此循环，直到宏任务与微任务清空。

### 类型与类型转换

基本类型：Number,String,Boolean,Null,Undefined,Symbol,Bigint.（按值访问）  
引用类型：Array,Object,Function,RegExp(正则)。（按引用访问）

undefined已经声明但没有赋值,代表未定义，不是保留字，有可能会被赋值，所以可以使用 void 0 代替。⚠️undeclared在作业域中未声明的对象  
null空对象  
NaN,typeof NaN是number，特殊的数字，isNaN（）会先转换参数为数字在判断，是NaN为true反之false，Number.isNaN()不会转换直接判断，对判断会更加严格。  

**判断空对象的反复**
Object.keys(obj).length的长度
JSON.Stringify()与"{}"对比


#### array所有的方法
```
/*es3方法*/
push  pop shift unshift reverse sort splice //改变原数组
slice concat toString join valueof

/*es5*/
indexOf lastIndexOf isArray
foreach | map filter (every some) (reduce reduceRight) //迭代方法

/*es6*/
...拓展运算符
from伪数组转数组  of创建有可变参数的数组
find findIndex 找到测试第一个值和第一个值的索引 includes判断一个数组是否包含一个值返回布尔
toLocaleString  toSource 
entries values keys
flat扁平化  flatMap循环后扁平化 
copyWithin fill//改变原数组
//**个别实例
let ar = [1,2,3,4,5]
ar.copyWithin(3,0,2) => [1, 2, 3, 1, 2]//要替换的位置，开始复制地方，结束的复制的地方

let ar = [1,2,3,4,5]
ar.fill(8,0,2)=>[8, 8, 3, 4, 5]//要填充内容，开始填充的位置，结束填充的位置
```
##### 判断:

typeof 检测基本类型，都会得到相应的类型（除了 null，所有判断变量是否是 null：(!a && typeof a == 'object')）。  
typeof 检测引用类型，基本都是 object,除了 function.  
Object.prototype.toString.call()可以判断任何类型

##### 转换：

类型的转换总是得到 number,string,boolean.  
string=>number:Number('10'),+'10',ParseInt('10a'),parseInt 允许传入非数字字符 (例如 px)，其从左往右解析，遇到非数字字符就会停下。而 Number 不允许传入非数字字符。  
number=>string:String(10),10+'',10.tostring().  
任何值=>boolean:Boolean(值)，!!值。

##### 隐式转换：

+操作符:

```
1+'a'=>'1a'
1+false=>1
'1'+false=>'1false'
false+true=>1
```

\*操作符:

```
1 * '23' => 23
1 * false => 0
1 / 'aa' => NaN</br>
==操作符: 3 == true // false
3 转为number为3，true转为number为1
'0' == false //true, '0'转为number为0
false转为number为0,'0' == 0 // '0'转为number为0
```

< 和 > 比较符:

```
如果两边都是字符串，则比较字母表顺序
'ca' < 'bd' // false
'a' < 'b' // true
其他情况下，转换为数字再比较：
'12' < 13 // true
false > -1 // true
以上说的是基本类型的隐式转换，而对象会被ToPrimitive转换为基本类型再进行转换：
var a = {}
a > 2 // false
```

### 其他常见考点

##### enerator 函数

特殊的函数，声明的时候 function\*，会返回多次，yield 控制一次次返回。  
它的使用场景是：使用特定的规则，生成数据。比如生成 ID，生成编号等等.

##### encodeURL 和 encodeURLComponent

encodeURI 用来处理整个 URI，所以它不会转义&, ?, /, =等完整 URI 必备字符，而 encodeURIComponent 会转义那些特殊字符，所以通常只用它来转义 URI 的参数。比如手工拼 URI 时对键值对使用 encodeURIComponent 进行转义。

##### 立即执行函数 (IIFE)

IIFE,立即执行函数使用场景，函数只执行一次没有必要给它起名字。

##### 函数在 JavaScript 中是第一公民 (first-class)

可以作为函数的参数，也可以作为函数的返回值，也可以作为普通对象有自己的键值对，也可以 push 到数组中。**函数可以当成普通对象看待**

##### arguments 参数是类数组

arguments 对象有 length 等属性，但它是伪数组，不能使用数组的方法。  
可以使用三种方法，将伪数组转换成数组。  
const arrArgs = Array.from(arguments)  
const arrArgs = [...arguments]  
const arrArgs = Array.protype.call(arguments)