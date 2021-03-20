# 前端知识点体系梳理

前端知识体系，从头到尾分为各个模块，打通奇经八脉。

## Javascript

### 函数的调用

作为独立函数调用，在非严格模式下 this 指向 windows，严格模式下指向 underfind。  
作为对象的方法调用，this 指向该对象。  
作为构造函数调用，看是独立函数调用还是属于方法调用。  
apply,call,bind  
相同点：可以改变 this 指向，第一次参数都是 this 要指向的对象，都可以利用后续参数进行传参。  
不同点：apply,call 是对函数的直接调用，bind 是返回一个函数，不直接调用，需要再次调用。

箭头函数  
写法简洁，this 指向不同，arguments 对象指向父级作用域的 arguments 对象，不存在变量提升，没有 new.target

**拓展**
_new 都发生了什么？？_
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

## HTML
### 渲染原理过程
解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树   

DOM Tree：浏览器将HTML解析成树形的数据结构。  
CSS Rule Tree：浏览器将CSS解析成树形的数据结构。  
Render Tree: DOM和CSSOM合并后生成Render Tree。  
layout: 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。    
painting: 按照算出来的规则，通过显卡，把内容画到屏幕上。  

#### 重排与重绘
重排(Reflow)：元素的位置发生变动时发生重排，也叫回流。此时在关键渲染路径中的 Layout 阶段，计算每一个元素在设备视口内的确切位置和大小。当一个元素位置发生变化时，其父元素及其后边的元素位置都可能发生变化，代价极高
重绘(Repaint): 元素的样式发生变动，但是位置没有改变。此时在关键渲染路径中的 Paint 阶段，将渲染树中的每个节点转换成屏幕上的实际像素，这一步通常称为绘制或栅格化

## CSS😏

### css 基础

#### 优先级规则

优先级由高到低：

1. !important
2. 匹配优先级计算，详情见下文
3. 若以上规则都无法解决，后来者优先级高
4. user agent stylesheet

优先级计算：A:内联样式 B:id 选择器 C:类选择器/属性选择器/伪类 D：标签选择器/伪元素  
⚠️ 少使用!important 尤其是在 npm 这种。伪类是单:，伪元素是双::  
user agent stylesheet 是浏览器默认的样式，不同浏览器不通

#### 盒模型

标准模式下，box-sizing 的值为 content-box，当给一个盒子设置宽高后，实际是给 content 设置宽高，所有的 padding、border 再往外扩展  
IE 下：box-sizing 的值为 border-box,当给一个盒子设置宽高后，指定的宽高是包含 border 和 padding

#### 格式化上下文

#### 块级格式化上下文 BFC

1. 垂直方向依次排列。
2. 上下的间距由 margin，同一 BFC 的子盒子会重叠。
3. BFC 里面的内容不会影响外部，反之也是。
4. 每个元素与 bfc 内容左侧相邻，float 也是。
5. BFC 不会与 float 重叠。
6. 计算高度 float 也会计算在内。

#### 行内格式化上下文 IFC

1. 水平方向依次排列。
2. 超出后换行。
3. 计算高度以子元素最大高度为准。

#### margin

对于行内替换元素来说，4 个方向的 margin 都是起作用的  
对于行内非替换元素来说，只有 margin-left 和 margin-right 起作用，margin-top 和 margin-bottom 是不起作用的

#### vertical-align 在 display:inline 与 table-cell 起作用。

#### 元素垂直居中

在项目中是很常见的
最开始我使用
1. 把容器的 line-height 属性设置为和容器的高度一样，但只有单行文字有效果。  
2. 如果知道容器和元素的高度，用绝对定位；  
3. 如果不知道元素的高度时，结合定位和 transform 一起用。  
后来使用css3，尤其是移动端时候特别强大，   
4. 可以用 flexbox 的话，就使用 flexbox；
看博客或文章也有了解到    
5. 当不需要指定元素的高度时，可以直接给一个相同的 padding-top 和 padding-bottom，让元素和 padding 一起撑起来容器；  
6. 需要指定容器高度，或者不能使用 padding 的时候，设置元素 display: table-cell 和 vertical-align: middle；  
  

### CSS 层叠上下文

HTML 元素层级是所谓的文档流,CSS 层叠上下文是文档流的子层叠。  
一个页面中可能会有很多个层叠上下文，而层叠上下文之间是独立的。层叠上下文里有一套自己的排列规则

#### 层叠上下文之间如何排列?

1.对于未定位元素，按照在元素在 HTML 文档中出现的顺序决定，越后面的元素越会覆盖在上面  
2.先渲染未定位元素，再渲染定位元素  
**_当一个元素被设置 z-index，它的所有后代和本元素形成一个层叠栈，也就是层叠上下文_**
_层叠上下文的后代元素只参与和根元素的对比，不参与和根元素以外的元素对比。_

#### 层叠上下文内部如何排序?(由上到下)⚠️ 只有定位元素才可以比较 z-index

1.z-index 为正值的定位元素。  
2.z-index 为 auto 的定位元素。  
3.未定位的元素。  
4.z-index 为负值的定位元素。  
5.层叠上下文的根元素。

### 移动端 CSS

#### em 与 rem

1em 等于本元素的字体大小。  
1rem 等于根元素的字体大小。  
em 适用于大小跟着字体的变化而变化的属性上，例如 padding,margin,width,height.元素根据继承不同字体的大小，跟着变化。

#### meta 标签

```
<meta name="viewport" content="width=divice-width" initail-scale="1">
```

viewport 是指浏览器看见 web 内容的窗口区域。
width=divice-width 是指浏览器视口的大小要与移动设备的宽度保持一致。  
initail-scale=1 是指初始化比例保持不变（响应式必要要有这个属性）

#### 物理像素/逻辑像素/像素密度？为什么要使用@2x，@3x 这样的图片？

例如 iPhone XS 在写代码的时候，其宽高是 414x896,当给宽度是 414px 时就占个整个屏幕，实际上**物理像素**是 1242x2688，经过计算 1242/414=3，得到的值就是所谓的**像素密度**，1**逻辑像素**=3 物理像素，这就是所谓的三倍屏。  
在三倍屏使用二倍像素的图片就会出现失真，最简单粗暴的方法就是使用最高像素的图片，但影响性能，所有可以使用 css 媒体查询，在不同的像素密度使用不同像素的图片。

#### 一般如何根据设计稿进行移动端的适配？

移动端的适配有两个维度

1. 在不同的像素密度下，使用不同精度的图片。
2. 在不同的屏幕大小下，使用 rem,em,vw,vh 等单位开发。

#### rem 如何计算

1. 看设计图比例，（如设计图是宽 750px，750/100=7.5）,根据比例（7.5）计算出 html 的 fontsize,此时 1rem == 100px  
   document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
2. 因为 1vw 等于视口宽的 1/100,（如设计图是宽 750px，1vw == 7.5px,1px == 0.13333333333rem,100px == 13.333333vw）  
   document.documentElement.style.fontSize = 13.333333vw

#### 所有元素设置成百分比，可以实现移动端相应式布局么？

不可以  
因为 width,height,padding,margin 是参考值是块元素而不是屏幕，font-size 的参考值是父元素，border-radius 与 box-shadow 只是部分支持百分比。

#### 如何进行相应式开发

1. 移动端优先，由于移动端窗口小，网速慢，touch 事件等，扩展到 pc 端会较容易一些。
2. 使用媒体查询不同视口调整不同的样式。
3. 使用流式布局，使页面布局随着视口的改变而改变。
4. 使用 viewport，避免浏览器使用虚拟的 veiwport。



### 客户端

#### 性能优化常见考点

浏览器缓存（Brower Caching）是浏览器在**本地磁盘**对用户最近请求过的文档进行存储，当访问者再次访问同一页面时，浏览器就可以直接从本地磁盘加载文档。  
好处有：**减少冗余数据传输、减少服务器负担、加快客户端加载网页的速度**。

浏览器的缓存规则分为两大块：强制缓存和协商缓存。（由 HTTP Response Headers 设置)  
强制缓存：客户端首先在本地检测是否有要请求的数据，如果有直接在本地获取，如果没有向服务端获取。  
协商缓存：客户端在本地获取请求标识，带着这个标识去服务端请求内容，如果请求缓存没有过期，返回 304，在本地获取请求数据，如果过期就在服务端获取请求数据。

强制缓存的实现

```
   Cache-Control:max-age=300(以秒为单位)
```

协商缓存的实现  
Last-Modified:HTTP response headers 中返回 Last-modified 返回头标识了此资源最后在服务端请求的时间。  
Etag：服务端针对这个资源通过算法返回一个唯一的值。

##### 浏览器缓存全过程

1. 浏览器第一次加载资源，返回 200，重服务端获取资源，把资源保存到本地以及 response header.
2. 第二次加载资源，先走强缓存，cache-control 的 max-age 有没有超时，如果没有超时，直接走强制缓存。
3. 没走强缓存，则进行协商缓存，根据 etag 值，判断是否和上次请求一样，如果一样返回 304，如果不一样返回 200，重新加载资源。

##### 缓存保存到哪里？

Service Worker  
Service Worker 运行在 JavaScript 主线程之外，虽然由于脱离了浏览器窗体无法直接访问 DOM，但是它可以完成离线缓存、消息推送、网络代理等功能。  
Memory Cache  
Memory Cache 就是内存缓存，它的效率最快，但是存活时间最短，你一关掉浏览器 Memory Cache 里的文件就被清空了。  
Disk Cache  
Cache 资源被存储在硬盘上，存活时间比 Memory Cache 要持久很多。

##### 说说你所知道的性能优化的方法？

1. 使用 cdn，通过 dns 负载均衡技术请求最近的 chache 服务器，以最快的速度请求服务器内容，也可以放一些静态资源放在 cdn 服务器上。
2. 合理利用缓存，使用 chache-control 与 etag 设置。
3. 使用雪碧图，合并 js 方法，减少请求数量。
4. 合并 css，js，减少请求的体积，服务端可以使用 Gzip 压缩。
5. 使用外联 css 与 js，css 放在头部（浏览器会等 css 加载后在渲染，避免重排，放在尾部会出现白屏），js 放在尾部，减少页面阻塞并发请求，使用代码拆分及延迟加载
6. 频繁操作 demo 时使用 fragment，减少重排。
7. 图片颜色复杂体积大优先使用 jpg，图片小不复杂例如图标优先使用 PNG8，图片颜色复杂半透明效果使用 PNG24.
8. 减少回流与重排，重绘。

##### 防抖与节流
N秒只执行一次  
**防抖**  
N秒能高频事件再次触发，则重新计算时间    
思路:每次触发取消之前的延时调用  
**节流**
稀释函数的执行频率  
思路:每次触发都判断是否有等待执行的延时函数

#### 什么是 XSS 攻击？如何防止 XSS 攻击？

XSS 是跨站脚本攻击，是 web 应用计算机安全漏洞，通过代码嵌入页面当中。  
防止攻击的方法：

1. 在输入时进行转码，如 html 中<>标签等特殊符号。
2. Cookie 设置 httponly，防止用户通过 document.cookie 获取到 cookie，⚠️ 此 http 头由服务端设置。
3. 重 url 获取值的时候一定要进行格式检查。
4. 不是用 eval 解析运行不确定的数据，json 解析请使用 JSON.parse。
5. 服务端也应该做的关键字的过滤。

### HTTP/HTTPS 协议

#### get 与 post 区别

get 只是请求数据，会保存到浏览器历史记录，可以缓存，可以通过 url 访问，经过 url 传参，是幂等的不会有副作用，不会给服务器增加负担。  
post 不会有缓存，不能保存到浏览器记录中，非幂等的，会给服务器增加负担。

#### http 状态码

200 客户端请求成功  
301 永久重定向  
302 暂时重定向  
304 未改变，重本地缓存中获取数据  
400 客户端语法错误  
401 未授权无法访问  
403 服务端拒绝服务  
404 找不到路径  
500 服务端不确定错误  
503 服务端当前不能处理服务，一段时间后可能恢复正常。

#### Cookie localStrage seesionStrage

生命周期  
cookie 一般是服务器端生成，可设失效时间，如果在客户端设置，默认生命周期是浏览器关闭。  
localStrage 没有失效时间，除非手动清理。  
seesionStrage 在页签及窗口关闭后失效  
大小  
cookie 4k strage 5M  
与服务器  
cookie 每次携带请求头，不能使用过多的内容，会影响性能，  
strage 不与服务器交互，
作用  
cookie 尽量精简，只携带与服务端交互所需要的信息，例如 token 验证登录信息  
strage 保存浏览器需要的本地数据，例如购物车信息等。

### 跨域

#### JSONP

本质不是 ajax 请求，而是通过 script 标签，ajax 有同源策略的限制，script 标签不会限制 🚫

```
function msg(content){
   console.log(content)
}
function jsonp(req){
    var script = document.createEletment('script');
    var url = `${req.url}?callback=${req.callbackname}`;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
jsonp({url:'http://demojsonp.com/test',callbackname:msg})
```

过程描述：
客户端发送 script 请求，参数中带着返回数据回调函数的名字。  
服务端收到请求，返回（回调函数名字+参数）的立即执行函数（如上例子：msg（‘I am server information’））



## git 基本操作

#### 文件名（泛指文件路径+文件名）例如'/home/index.html'

#### commit 指 git log 时 commit 后的 id,取前七位即可

#### 标签名即为名称例如'v1.0

#### 分支名也为名称除了 master 以外

git status 查看当前状态  
git fetch/git pull 拉取代码  
git add . 所有代码添加到暂存区  
git commit -m '信息' 暂存区提交  
git push origin master 提交到远程  
git rm '文件名' 删除  
git mv '文件名' 重命名/移动文件  
git log --pretty=oneline '文件名' 查看文件前后变化（用得到的 id，git show 得到的 id ，也能看见具体的变化）  
git log --oneline 查看简写的提交记录  
git log --oneline --graph 查看版本路线  
git log -p '文件名' 具体修改的内容  
git diff 查看文件不同（针对改动少）  
git checkout -- '文件名' 当前文件还原到上一次提交的状态（已追踪时无效，在暂存区属于已追踪）  
git reset HEAD '文件名' 撤销文件的追踪  
git reset --hard HEAD^ 回到上一版本（两个^^就是回退到前两个版本）  
git reset --hard 'commitid' 回到指定版本  
git checkout 'commitid' -- '文件名' 将指定文件回退到指定版本  
git tag '标签名' 创建标签  
git tag 查看标签  
git tag '标签名' 'commitid' 为之前的项目创建标签  
git tag -d '标签名' 删除标签  
git push origin '标签名' 标签名推送到远程仓库  
git branch '分支名' 创建分支  
git branch 查看分支  
git checkout '分支名' 切换分支  
git branch -d '分支名' 删除分支（不能删除当前所在分支）  
git push origin --delete '分支名' 删除远程分支  
git checkout -b test 创建并切换分支  
git branch -D '分支名' 强制删除分支  
git merge '分支名' 合并分支（合并分支，需要切换到要合并分支上，例如 dev 分支合并到 master 分支,要切换到 master 分支，在执行此合并命令）

###### 合并冲突时：

- git merge --abort 保留当前分支的代码，忽略其他分支的代码。
- 手动解决冲突：  
  去掉前后及中间等号，保留想要的代码 => git status 查看一下是不是同时修改了一个文件=> git add . => git commit => 进入可编辑界面 => i 进入可编辑状态输入解决状态的备注 => :wq 保存退出 => git commit 如果没有冲突后 => git commit -m '解决冲突后的代码' => git push origin master 推送到远程分支
- git merge --abort 保留当前分支的代码，忽略其他分支的代码。
- git merge --abort 保留当前分支的代码，忽略其他分支的代码。



## VUE

### 列表组件中写key的作用

#### 不带key
**优点**:可以复用节点(就地复用)，省去销毁与创建的开销    
**缺点**:就地复用某节点有绑定状态还存在，没有过渡效果  
**适用**:不依赖子组件状态（这个还需要研究一下，为什么依赖子组件状态不可以不带key）或临时  DOM状态的列表渲染  
#### 带key
**_更准确更快速的找到oldVnode中对应的Vnode_**  
由于vue中diff在更新时，oldVnode与Vnode进行对比  
带key是通过map映射查找   
不带key是通过循环遍历查找   

### 生命周期

1. beforeCreate:此时 data，method 还没有初始化，可以使用 loding。
2. Created：此时 data，method 已经初始化，可以在此初始化 data 数据及 method 方法自执行。
3. beforMount:编译模版在 el 上面挂载虚拟 dome 节点。
4. Mounted：编译模版在 el 上面挂载真实的 dome 节点。
5. beforeUpdate:数据更新时触发，重新渲染虚拟 dome。
6. Updated：数据更新完成后触发。
7. beforeDestory：组件销毁前触发，此时 watchers，子组件和事件销毁。
8. Destoryed：组件销毁后触发。

### 双向绑定原理

```
var obj={};
Object.definePropety(obj,'tex',{
   get:function(){
      return obj.tex;
   }
   set:function(newval){
      document.getElementById('输入框id').value=newval;
      document.getElementById('绑定的id').innerhtml=newval;
   }
}
document.addEventListener('keyup',function(e){
   obj.tex = e.target.value;
})
```

🌿 重点理解：Object.definePropety 可以设置对象的属性这一特性。

### 组件传值

1. 通过 propos 传递
2. 通过$emit 触发自定义事件
3. 使用 ref
4. EventBus
   bus.js

```
// 创建一个中央时间总线类
class Bus {
  constructor() {
    this.callbacks = {};   // 存放事件的名字
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}

// main.js
Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上
// 另一种方式
Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能
```

children1.vue

```
this.$bus.$emit('foo')
```

children2.vue

```
this.$bus.$on('foo',this.handle);
```

5. parent 或 root
   兄弟组件

```
this.$parent.emit('add')
```

另一个兄弟组件

```
this.$parent.on('add',this.add)
```

6. attrs 与 listeners

```
//child:并未在props中声明foo
<p>{{$attrs.foo}}</p>
//parent
<HelloWord foo="foo"/>
```

```
// 给Grandson隔代传值，communication/index.vue
<Child2 msg="lalala" @some-event="onSomeEvent"></Child2>

// Child2做展开
<Grandson v-bind="$attrs" v-on="$listeners"></Grandson>

// Grandson使⽤
<div @click="$emit('some-event', 'msg from grandson')">
{{msg}}
</div>
```

7. Provide 与 Inject
   祖先组件定义

```
provide(){
    return {
        foo:'foo'
    }
}
```

后代组件

```
inject:['foo']
```

8. 小结  
   父子关系的组件数据传递选择 props 与 $emit进行传递，也可选择ref  
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent 进行传递  
   祖先与后代组件数据传递可选择 attrs 与 listeners 或者 Provide 与 Inject  
   复杂关系的组件数据传递可以通过 vuex 存放共享的变量

### 组件上实现 v-modle

1. props 接收 value 属性
2. 新的 value 时$emit 触发 input 事件


## 正则表达式
正则表达式有两种基本的用途，查找和替换。（给定一个正则表达式，要么匹配一些文本，要么匹配一些文本后替换文本）    
` 正则表达式是用来匹配和处理文本的字符串（它有自己特殊的语法与指令）`  
+ 匹配单个字符
   + .匹配任意字符
   + \对字符进行转义（有特殊含义的总是以\开头）
+ 匹配多个字符
   + []和，匹配该集合里字符之一（ ex:[1,2,3,4,5,6,7,8,9] ）
   + -区间，（ex:[1-9]）⚠️在[]外只是普通字符，与-本身想匹配
   + ^非，除了该集合里的字符，其他字符都匹配。（ex:[^1-9]）
+ 空白元字符
   + [\b] 回退（删除）一个字符
   + \n 换行
   + \f 换页
   + \r 回车
   + \t tab键
   + \v 垂直制表符
+ 特定字符类别
   + \d 任何一个数字（[0-9]）
   + \D 任何一个非数字（^[0-9]）
   + \w 任何一个字母数字或下划线字符（[a-zA-Z0-9_]）
   + \W 任何一个非字母数字或下划线([^a-zA-Z0-9])
   + \s 任何一个空白字符([\f\n\r\t\v])
   + \S 任何一个非空白字符([^\f\n\r\t\v])
