## Javascript

### 函数的调用(this):this取值是在函数执行时确认

-  作为独立函数调用，在非严格模式下 this 指向 windows，严格模式下指向 underfind。  
-  作为对象的方法调用，this 指向该对象。  
-  作为构造函数调用，看是独立函数调用还是属于方法调用。(因为构造函数**指向**的是使用构造函数的**实例**)  
-  apply,call,bind  
   - 相同点：可以改变 this 指向，第一次参数都是 this 要指向的对象，都可以利用后续参数进行传参。  
   - 不同点：apply,call 是对函数的直接调用，bind 是返回一个函数，不直接调用，需要再次调用。

**箭头函数**  
- 写法简洁,是匿名函数.
- this指向不同，永远指向其[执行上下文](#zhixing)的this,任何方法都改变不了其this(apply,call,bind)
- 没有arguments对象,平常开发中使用rest参数...来进行参数的使用
- 不能用于构造函数,不能使用new操作符,因为没有prototype,([new 都发生了什么?](#new))
- 没有 new.target
- 不存在变量提升

**拓展**
<div id="new">new 都发生了什么？？<div>

1. 创建一个新对象
2. 构造函数的原型对象给了新对象的proto属性
3. 执行构造函数中的代码
4. 返回新对象,如果执行后的结果是对象,返回对象,不是对象返回新创建的obj
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
   let result = Person.call(newobj)
   if(typeof result === 'object'){
      return result
   }else{
      return newobj
   }
   //注意:不添加new 它指的是全局对象,global.name = 'ls',本身没有返回值，所以是undefined
```

##### 立即执行函数 (IIFE)

IIFE,函数只执行一次没有必要给它起名字,函数创建后立即执行，作用就是能创建一个独立的作用域 。

##### 函数在 JavaScript 中是第一公民 (first-class)

可以作为函数的参数，也可以作为函数的返回值，也可以作为普通对象有自己的键值对，也可以 push 到数组中。**函数可以当成普通对象看待**

##### arguments 参数是伪数组

arguments 对象有 length 等属性，但它是伪数组，不能使用数组的方法。  
可以使用三种方法，将伪数组转换成数组。  
const arrArgs = Array.from(arguments)  
const arrArgs = [...arguments]  
const arrArgs = Array.protype.call(arguments)
   
**内置函数**
-  在代码执行前，js定义在全局作用域的内置的属性，函数与构造函数。  
-  全局属性常见的有NaN，Undefined  
-  全局函数有parseFloat,parseInt  
-  全局构造函数有Object，Date,Math  



### 闭包

-  变量：用于存储数据的容器；  
-  标识符：代码中用来标识变量、函数、或属性的字符序列。  
-  <span id="zhixing">执行上下文<span>：评估和执行 JavaScript 代码的环境的抽象概念。（全局，函数，eval 函数）。  
-  词法作用域：JavaScript **从标识符到变量的映射机制**，在词法分析阶段生成的作用域，词法分析阶段，就可以理解为写代码阶段。
   - 作用域(scope):一个变量的可用范围
   - 作用域链(scope chain):以当前作用域的scope属性为起点,依次引用每个AO,直到window结束,形成多级引用关系
   - 分类:全域作用域/函数作用域/es6块级作用域
   - js执行时,严格按照作用域机制scope来执行,并且js的变量和函数作用域是定义时决定的,而不是执行时决定
   
-  闭包：由于浏览器的垃圾回收机制，在 JavaScript 中，函数是第一公民，所以函数可以被当作一个普通的变量传递，所以函数在运行时可能会看起来已经脱离了原来的词法作用域。但是由于函数的作用域早就在词法分析时就确定了，所以函数无论在哪里执行，都会记住被定义时的作用域。这种现象就叫作闭包。  

- 形成闭包的流程
   - 首先创建一个全局的执行上下文(EC)
   - 然后函数执行,创建一个局部的执行上下文,返回了一个函数
   - 函数执行的时候,由于之前局部上下文中作用域已经决定了变量
   - 所以产生了闭包(信息驻留)

**闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。**  

本来是函数执行完毕，执行环境销毁，对应的变量对象销毁，但是当 A 函数内的 B 函数将 A 函数的活动对象添加到他的活动对象，当 B 被全局变量接受不了后，A 函数内部的活动对象就不会消失，因此就可以访问到 A 函数内部变量；  
   - 注意：它只能取得这个变量的最后最终值  
   - 重点：一定要函数返回配合匿名函数；  
   - 备注：垃圾回收机制：为了防止内存泄漏，浏览器会周期性的清理用不到的内存（变量）。

   - 闭包的使用场景：封装功能是（需要私有变量方法时）。  
   - 防抖函数，节流函数，柯里化函数，在循环中给元素绑定事件。

**闭包的优缺点：**  
- 优点：闭包减少全局变量，可重复使用，避免变量污染。
- 缺点：闭包比普通函数内存大，影响性能，在 IE 下容易造成内存泄露。

**综上所述,😊 闭包是词法作用域和函数是 JavaScript 的第一公民相互所用自然而然产生的现象。**

**闭包:自由变量的查找,是在函数定义的地方,向上级作用域查找,不是在执行的地方.**(可在编程能力培养题/闭包.js中查看)


### 原型与继承

!['Prototype img'](https://raw.githubusercontent.com/Cqy1995/front-end-knowledge-system/main/images/prototype.png)   
- 每个函数都有显示(prototype 属性)，指向原型对象。  
- 每个对象有个隐示原型(**__proto__**属性)，指向该对象的原型。（普通对象没有 prototype 属性）。


```
function Person() {}
var person = new Person();
person.__proto__ === Person.prototype
**实例的 __proto__ 指向构造函数的 prototype** 
```

原型的概念：保存所有子对象中共有属性和方法的父对象
- 万物皆对象,万物皆空
- 对象创建，就会与之关联另一个对象，这个对象就是原型，每一个对象都会从原型中“继承”属性。  
- 每个原型都有一个 constructor 属性，指向该关联的构造函数。


原型链:由各级子对象的_proto_属性连续引用形成的结构

- 挂载在函数内部的方法,实例化对象内部会复制构造函数的方法
- 挂载在原型上的方法,不会去复制
- 挂载在内部和原型上的方法都可以通过实例去调用
- 一般来说,如果需要访问构造函数内部的私有变量,我们可以定义在函数内部,其他情况我们可以定义在函数的原型上

Object与Function
- Function是顶层构造器,Object是顶层对象
- 原型上:Function继承了Object.prototype
- 构造器上:Function构造了Object 

```
Person===Person.prototype.constructor(constructor是prototype上的属性，这一点很容易被忽略掉。)
person instanceof Person ==> true
constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；
而instanceof比较松散，只要检测的类型在原型链上，就会返回true。
```

#### 继承
  - 原型链继承，A与B两个对象，B.protype=new A()️只能继承原型对象上的属性，如果属性是引用类型，属性共享，多个函数不能继承,不能向父类型传递参数
  - 构造函数:A.apply(this，agrments)解决了不能向父类型传递参数的问题️只能继承函数上面的属性，不能继承原型对象的属性，无法实现函数方法的赋用，都是独立的，占用内存，
  - 组合式继承：伪经典继承：️1父类的构造函数执行两次，第一次是porotype指向父类实例时，第二次子类调用父类时又调用一次，如果父类函数比较大，运行比较慢，调用时不影响，会出现同名屏蔽的问题，不影响，多占点内存  
      - 通过构造函数的方式来实现函数属性的继承，
      - 通过子类的实例来继承父类的方法。
      - 调用两次构造函数，多了许多不必要的属性，所以叫伪经典继承
  - 原型继承，实现对象继承，基于已有对象来创建新的对象
  - 寄生式继承，实现对象继承
  - 组合寄生式继承，完美继承：先通过原型链继承创建一个对象，

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

### JavaScript执行机制(EvenLoop)

单线程:
- js是单线程,同时只能做一件事情
- js与dom渲染公用同一个线程,因为js可修改dom结构

异步:
- 解决单线程等待的问题(定时器,网络请求)
- 不会阻塞后面代码的执行

同步
- 从上到下执行
- 会阻塞代码执行

js如何执行
- 从前到后,一行一行执行
- 如果某一行执行报错,则停止下面代码的执行
- 先把同步代码执行完,在执行异步


宏任务：同步 script（整体代码），setTimeout 回调函数，setInterval 回调函数，I/O,UI renderding。  
微任务： process.nextTick, Promise 回调函数，Object.observe，MutationObserver。 

代码执行顺序：  
1. 先执行同步阻塞任务，同步任务会等待上一个执行完毕以后执行下一个，当同步任务执行完毕，再执行异步任务，遇到异步任务会将异步任务的回调函数注册在异步任务队列里。注意，如果主线程上没有同步任务会直接调用异步任务的微任务。
2. 执行宏任务，遇到微任务将都添加到微任务队列里。
3. 当前宏任务执行完后,执行微任务队列，直到微任务队列全部执行完，微任务队列为空。
4. 执行宏任务，如果在执行宏任务期间有微任务，将微任务添加到微任务队列里，执行完宏任务之后执行微任务，直到微任务队列全部执行完。
5. 继续执行宏任务队列。
6. 重复2,3,4,5....直到宏微任务为空

#### Promise

- Promise相当一个容器,它存放着未来要发生事件的结果
- 有三种状态:pendding/resolve/reject,两种改变状态方式:进行中→成功与进行中→失败.状态一旦已决议将不能在改变,在进行中无法判断是请求开始还是快要结束
- 有两个参数,第一参数resolve成功时调用,第二个参数reject失败是调用,成功调用then,失败调用catch
  - 无论then或catch没有报错都返回resolved的promise,有报错永远都返回rejected的promise
  

#### 手写Promise
```
   const PENDDING = new Symbol('pendding');
   const FULLFILLED = new Symbol('resolve');
   const REJECT = new Symbol('reject');
   function Promise(fn){   
      this.status = PENDDING;
      this.val = '';
      const resolve = (val)=>{
         this.status = FULLFILLED
         this.val = val
      }
      const rejcet = (err)=>{
         this.status = REJECT
         this.val = err
      }
      this.then = (onresolve,onrejcet){
         if(this.stauts == FULLFILLED){
            onresolve(this.val)
         }else{
            onrejcet(this.val)
         }
      }
      try{
         fn(resolve,rejcet)
      }catch(error){
         rejcet(error)
      }
      
   }
```
### async与await
async是一个装饰器，默认返回一个promise对象resolve的值，因此可以对async对象直接使用then方法。
await也是一个装饰器，放在async函数里面。作用是获取promise对象的决议值。遇到await会阻塞后面代码执行，直到async外同步代码执行后，执行await后的代码。


### 类型(堆栈)与类型转换
- 计算机内存
   - 栈:计算机为**原始类型**开辟一块内存空间
   - 堆:计算机为**引用类型**开辟的一块内存空间,存的是引用地址.
- 基本类型：Number,String,Boolean,Null,Undefined,Symbol,Bigint.（按值访问）  
   - undefined已经声明但没有赋值,代表未定义，不是保留字，有可能会被赋值，所以可以使用 void 0 代替。  
   - ⚠️undeclared在作业域中未声明的对象    
   - null空对象    
   - NaN,typeof NaN是number，特殊的数字，isNaN（）会先转换参数为数字在判断，是NaN为true反之false，Number.isNaN()不会转换直接判断，对判断会更加严格。  
- 引用类型：Array,Object,Function,RegExp(正则)。（按引用访问）
  
##### 内置对象
-  基本类型:string,number,boolean => 通过String,Number,Boolean构造函数生成
   - 装箱,拆箱
-  其他内置对象
   - Array Function Date ... Math


###### 装箱(基本类型 => 引用类型)
1. 通过相应的基本类型构造函数,创建不过的变量
2. 调用这个变量的方法
3. 清空第一步创建的变量
4. 返回值


###### 拆箱(引用类型 => 基本类型),valueOf方法,Primitive执行过程：
1. 如果input是原始值，直接返回这个值；
2. 否则，如果input是对象，调用input.valueOf()，如果结果是原始值，返回结果；
3. 否则，调用input.toString()。如果结果是原始值，返回结果；
4. 否则，抛出错误。
如果转换的类型是String，2和3会交换执行，即先执行toString()方法。


**判断空对象的反复**
Object.keys(obj).length的长度
JSON.Stringify()与"{}"对比

##### 判断:
**typeof:检测数据类型,返回字符串**
- typeof 检测基本类型，都会得到相应的类型（除了 null，所有判断变量是否是 null：(!a && typeof a == 'object')）。  
   - 少null:检查数据类型,是以机器码码后三位,后三位是000的话就是object(null的机器码都是0)
- typeof 检测引用类型，基本都是 object,除了 function.  
   - 多function:function比object多了内部的一个[[call]]方法
- Object.prototype.toString.call()可以判断任何类型
**instanceof**
- instanceof,检测A对象是否是B对象实例化出来的,返回布尔,true/false
- instanceof 原型链 A instantceof B => true, B instanceof C => true, A instanceof C => true


##### 转换：

类型的转换总是得到 number,string,boolean.  
- string=>number:Number('10'),+'10',ParseInt('10a'),parseInt 允许传入非数字字符 (例如 px)，其从左往右解析，遇到非数字字符就会停下。而 Number 不允许传入非数字字符。  
- number=>string:String(10),10+'',10.tostring().  
- 任何值=>boolean:Boolean(值)，!!值。

- valueOf():原始类型值?有=>返回 : 没有=>返回对象本身
- toString():原始=>字符串类型;对象=>[object type]

常用:
1. 判断语句相等时,除了 == null之外,其他都一律用 ===
2. if语句(判断的是falsely和truly变量)
   - (0,NaN,'',null,undefined,false)为falsely变量,除此之外都是truly变量
3. && 和 || 操作符
   - &&（逻辑与）,从字面上来说，只有前后都是true的时候才返回true，否则返回false。
   - ||（逻辑或）,从字面上来说，只有前后都是false的时候才返回false，否则返回true。

##### 强制转换
parseInt,parseFloat,toString等

##### 隐式转换：

+操作符:

```
1+'a'=>'1a'
1+false=>1
'1'+false=>'1false'
false+true=>1
```

\* == 操作符:

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



**js舍入误差**
0.1+0.2=0.3000000000000004  
计算是通过二进制进行计算,计算后二进制转10进制会存在舍入精度丢失
解决方案:
- parseFloat((0.1+0.2).toFixed(2))//数据小的时候可以这样
- 
```
function(num1,num2){
   m = Math.pow(10,2)
   return (num1 * m + num2 * m)/m
}
```



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


### 事件与事件流
事件:文档与浏览器窗口的交互瞬间.也就是通过事件实现Javascript与HTML交互.  
可以使用监听器预定事件(观察者模式)
- DOM0规范
   - 可以内联直接绑定到HTML标签中,(不符合问w3c内容与行为分离的标准)
   - 事件绑定:通过在JS中选中某个节点，然后给节点添加onclick属性(document.getElementById("btn").onclik = funciton(){})
   - **注意:只有冒泡阶段,并且只能绑定一个事件**
   - 事件绑定为什么只能绑定一个事件?
      - js不支持事件重载,绑定事件相当于一个变量存储的是函数的地址,如果在绑定一个事件,相当于变量指向另一个函数地址
      - 事件监听相当于订阅发布者,改变数据,触发事件,订阅这个事件的函数被执行
- DOM2/DOM3
   - 事件监听:addEventListener() ---添加事件侦听器/removeEventListener() ---删除事件侦听器
   - 函数均有3个参数， 第一个参数是要处理的事件名 第二个参数是作为事件处理程序的函数 第三个参数是一个boolean值，默认false表示使用冒泡机制，true表示捕获机制
   - **先执行捕获阶段的处理程序，后执行冒泡阶段的处理程序**
   - stopPropagation函数,阻止冒泡。IE8:e.cancelBubble =true
   - **注意:有捕获阶段/冒泡阶段,并且能绑定多个事件,监听方法一样会覆盖**

##### 事件委托
   利用冒泡的原理,给多个动态节点,绑定函数.    
   优点:1,提高性能,(防止每次渲染都动态绑定,消耗性能)2,动态监听  
   使用target.innerHTML,主要使用target
   - target返回触发事件的元素,不一定是绑定的元素
   - currentTarget返回绑定事件元素

#####  DOM操作 
创建新节点
```
creatDocumentFragment()//创建一个dom片段
createElement()//创建一个具体元素
createTextNode()//创建一个文本节点
```
添加，移除，替换，插入
```
appendChild()
removeChild()
replaceChild(new,old)
insertBefore(new,old)
```
查找
```
getElementById() 获取动态集合,每一次在Javascript函数中使用这个变量的时候都会再去访问一下这个变量对应的html元素。
getElementByName()
getElementByTagName()
getElementByClassName()
querySelector() 获取静态集合,获取到元素之后，不论html元素再怎么改变，这个变量并不会随之发生改变(获取指定选择器或选择器组匹配的第一个html元素Element,没有匹配选择null)
querySelectorAll()
```
属性操作
```
getAttribute(key)
setAttribute(key,value)
hasAttribute(key)
removeAttribute(key)
```
### 其他常见考点

##### 面向对象OOP (js万物皆对象)
- 封装:定义各种公共的方法
- 继承:子继承父
- 多态:重载,重写:继承时可重写父类的方法

##### enerator 函数

特殊的函数，声明的时候 function\*，会返回多次，yield 控制一次次返回。  
它的使用场景是：使用特定的规则，生成数据。比如生成 ID，生成编号等等.

##### encodeURL 和 encodeURLComponent

encodeURI 用来处理整个 URI，所以它不会转义&, ?, /, =等完整 URI 必备字符，而 encodeURIComponent 会转义那些特殊字符，所以通常只用它来转义 URI 的参数。比如手工拼 URI 时对键值对使用 encodeURIComponent 进行转义。

decodeURI decodeURIComponent相应的进行解密

##### 重载与多态
- 重载:相同的函数名,根据不同的参数,形成不同功能的函数
   - 在函数调用时,自动识别不同的参数,实现相同的函数名,不同的调用
   - js本身没有重载,可以通过arguments来实现重载
- 多态:同一个东西表现不同的状态(重写与重载)

