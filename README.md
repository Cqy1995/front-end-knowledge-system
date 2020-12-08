# 前端知识点体系梳理
前端知识体系，从头到尾分为各个模块，打通奇经八脉。

## Javascript

### 函数的调用
作为独立函数调用，在非严格模式下this指向windows，严格模式下指向underfind。  
作为对象的方法调用，this指向该对象。  
作为构造函数调用，看是独立函数调用还是属于方法调用。  
apply,call,bind可以改变this指向。  
箭头函数，继承父的this  

**立即执行函数：函数创建后立即执行，作用就是能创建一个独立的作用域**
### 闭包
变量：用于存储数据的容器；  
标识符：代码中用来标识变量、函数、或属性的字符序列。  
执行上下文：评估和执行 JavaScript 代码的环境的抽象概念。（全局，函数，eval函数）。  
词法作用域：JavaScript 从标识符到变量的映射机制，在词法分析阶段生成的作用域，词法分析阶段，就可以理解为写代码阶段。  
闭包：由于浏览器的垃圾回收机制，在JavaScript中，函数是第一公民，所以函数可以被当作一个普通的变量传递，所以函数在运行时可能会看起来已经脱离了原来的词法作用域。但是由于函数的作用域早就在词法分析时就确定了，所以函数无论在哪里执行，都会记住被定义时的作用域。这种现象就叫作闭包。  
闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。  
本来是函数执行完毕，执行环境销毁，对应的变量对象销毁，但是当A函数内的B函数将A函数的活动对象添加到他的活动对象，当B被全局变量接受不了后，A函数内部的活动对象就不会消失，因此就可以访问到A函数内部变量；  
注意：它只能取得这个变量的最后最终值  
重点：一定要函数返回配合匿名函数；    
备注：垃圾回收机制：为了防止内存泄漏，浏览器会周期性的清理用不到的内存（变量）。

闭包的使用场景：封装功能是（需要私有变量方法时）。  
防抖函数，节流函数，柯里化函数，在循环中给元素绑定事件。  

闭包的优缺点：  
优点：闭包减少全局变量，可重复使用，避免变量污染。 
缺点：闭包比普通函数内存大，影响性能，在IE下容易造成内存泄露。  


#### 综上所述,😊闭包是词法作用域和函数是JavaScript的第一公民相互所用自然而然产生的现象。
### 原型与继承
每个函数都有prototype属性，指向原型对象。  
每个对象有个__proto__属性，指向该对象的原型。（普通对象没有prototype属性）。  
```
function Person() {}  
var person = new Person();  
person.__proto__ === Person.prototype
实例的 __proto__ 指向构造函数的 prototype 
```
原型的概念：对象创建，就会与之关联另一个对象，这个对象就是原型，每一个对象都会从原型中“继承”属性。  
每个原型都有一个constructor属性，指向该关联的构造函数。  
```
Person===Person.prototype.constructor(constructor是prototype上的属性，这一点很容易被忽略掉。)  
person instanceof Person ==> true 
constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；    
而instanceof比较松散，只要检测的类型在原型链上，就会返回true。
```
### 异步函数与promise
宏任务：同步script（整体代码），setTimeout回调函数，setInterval回调函数，I/O,UI renderding。  
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
##### 判断:
typeof检测基本类型，都会得到相应的类型（除了null，所有判断变量是否是null：(!a && typeof a == 'object')）。  
typeof检测引用类型，基本都是object,除了function.  
Object.prototype.toString.call()可以判断任何类型  
##### 转换：
类型的转换总是得到number,string,boolean.  
string=>number:Number('10'),+'10',ParseInt('10a'),parseInt允许传入非数字字符 (例如px)，其从左往右解析，遇到非数字字符就会停下。而Number不允许传入非数字字符。  
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
*操作符: 
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
特殊的函数，声明的时候function*，会返回多次，yield控制一次次返回。  
它的使用场景是：使用特定的规则，生成数据。比如生成 ID，生成编号等等.  
##### encodeURL和encodeURLComponent
encodeURI用来处理整个 URI，所以它不会转义&, ?, /, =等完整URI必备字符，而encodeURIComponent会转义那些特殊字符，所以通常只用它来转义URI的参数。比如手工拼URI时对键值对使用encodeURIComponent进行转义。
##### 立即执行函数 (IIFE)
IIFE,立即执行函数使用场景，函数只执行一次没有必要给它起名字。  
##### 函数在 JavaScript 中是第一公民 (first-class)
可以作为函数的参数，也可以作为函数的返回值，也可以作为普通对象有自己的键值对，也可以push到数组中。**函数可以当成普通对象看待**  
#####  arguments 参数是类数组
arguments对象有length等属性，但它是伪数组，不能使用数组的方法。  
可以使用三种方法，将伪数组转换成数组。  
const arrArgs = Array.from(arguments)  
const arrArgs = [...arguments]  
const arrArgs = Array.protype.call(arguments)

手写promise
```
const PENDING = Symbol();
const REJECT = Symbol();
const FULLFILLED = Symbol();

const MyPromise = function(){
    this.state = PENDING;
    this.value = '';
    const resolve = (val)=>{
        this.state = FULLFILLED;
        this.value=val;
    }
    const rejcect = (err)=>{
        this.state = REJECT;
        this.value = err;
    }
    this.then = (onfullfilled,onreject)=>{
        if (this.state == FULLFILLED) {
            onfullfilled(this.value)
        }else{
            onreject(this.value)
        }
    }
    try {
        fn(resolve,rejcect)
    } catch (error) {
        rejcect(err)
    }
}
```
## CSS😏
### css基础
#### 优先级规则
优先级由高到低：  

1. !important  
2. 匹配优先级计算，详情见下文  
3. 若以上规则都无法解决，后来者优先级高  
4. user agent stylesheet  

优先级计算：A:内联样式 B:id选择器 C:类选择器/属性选择器/伪类 D：标签选择器/伪元素  
⚠️少使用!important尤其是在npm这种。伪类是单:，伪元素是双::  
user agent stylesheet是浏览器默认的样式，不同浏览器不通  

#### 盒模型
标准模式下，box-sizing的值为content-box，当给一个盒子设置宽高后，实际是给content设置宽高，所有的 padding、border 再往外扩展  
IE下：box-sizing的值为border-box,当给一个盒子设置宽高后，指定的宽高是包含 border 和 padding  
#### margin
对于行内替换元素来说，4 个方向的margin都是起作用的  
对于行内非替换元素来说，只有margin-left和margin-right起作用，margin-top和margin-bottom是不起作用的  
#### vertical-align在display:inline与table-cell起作用。
#### 元素垂直居中

当不需要指定元素的高度时，可以直接给一个相同的padding-top和padding-bottom，让元素和padding一起撑起来容器；  
需要指定容器高度，或者不能使用padding的时候，设置元素display: table-cell 和 vertical-align: middle；  
不需要严格的兼容，可以用 flexbox 的话，就使用flexbox；  
内容只有一行文本时，把容器的line-height属性设置为和容器的高度一样；  
上面的方法都不能用时，如果知道容器和元素的高度，用绝对定位；  
如果不知道元素的高度时，结合定位和transform一起用。  

### CSS层叠上下文
HTML元素层级是所谓的文档流,CSS层叠上下文是文档流的子层叠。  
一个页面中可能会有很多个层叠上下文，而层叠上下文之间是独立的。层叠上下文里有一套自己的排列规则  
#### 层叠上下文之间如何排列?
1.对于未定位元素，按照在元素在 HTML 文档中出现的顺序决定，越后面的元素越会覆盖在上面   
2.先渲染未定位元素，再渲染定位元素   
***当一个元素被设置 z-index，它的所有后代和本元素形成一个层叠栈，也就是层叠上下文*** 
*层叠上下文的后代元素只参与和根元素的对比，不参与和根元素以外的元素对比。*
#### 层叠上下文内部如何排序?(由上到下)⚠️只有定位元素才可以比较z-index
1.z-index为正值的定位元素。  
2.z-index为auto的定位元素。  
3.未定位的元素。    
4.z-index为负值的定位元素。  
5.层叠上下文的根元素。  

### 移动端CSS

#### em与rem
1em等于本元素的字体大小。  
1rem等于根元素的字体大小。  
em适用于大小跟着字体的变化而变化的属性上，例如padding,margin,width,height.元素根据继承不同字体的大小，跟着变化。  

#### meta标签
```
<meta name="viewport" content="width=divice-width" initail-scale="1">
```
viewport是指浏览器看见web内容的窗口区域。
width=divice-width是指浏览器视口的大小要与移动设备的宽度保持一致。  
initail-scale=1是指初始化比例保持不变（响应式必要要有这个属性）  

#### 物理像素/逻辑像素/像素密度？为什么要使用@2x，@3x这样的图片？
例如iPhone XS在写代码的时候，其宽高是414x896,当给宽度是414px时就占个整个屏幕，实际上**物理像素**是1242x2688，经过计算1242/414=3，得到的值就是所谓的**像素密度**，1**逻辑像素**=3物理像素，这就是所谓的三倍屏。   
在三倍屏使用二倍像素的图片就会出现失真，最简单粗暴的方法就是使用最高像素的图片，但影响性能，所有可以使用css媒体查询，在不同的像素密度使用不同像素的图片。

#### 一般如何根据设计稿进行移动端的适配？
移动端的适配有两个维度  
1. 在不同的像素密度下，使用不同精度的图片。  
2. 在不同的屏幕大小下，使用rem,em,vw,vh等单位开发。

#### 所有元素设置成百分比，可以实现移动端相应式布局么？ 
不可以  
因为width,height,padding,margin是参考值是块元素而不是屏幕，font-size的参考值是父元素，border-radius与box-shadow只是部分支持百分比。

#### 如何进行相应式开发
1. 移动端优先，由于移动端窗口小，网速慢，touch事件等，扩展到pc端会较容易一些。  
2. 使用媒体查询不同视口调整不同的样式。
3. 使用流式布局，使页面布局随着视口的改变而改变。
4. 使用viewport，避免浏览器使用虚拟的veiwport。


### 客户端

#### 性能优化常见考点
浏览器缓存（Brower Caching）是浏览器在**本地磁盘**对用户最近请求过的文档进行存储，当访问者再次访问同一页面时，浏览器就可以直接从本地磁盘加载文档。  
好处有：**减少冗余数据传输、减少服务器负担、加快客户端加载网页的速度**。

浏览器的缓存规则分为两大块：强制缓存和协商缓存。（由HTTP Response Headers设置)   
强制缓存：客户端首先在本地检测是否有要请求的数据，如果有直接在本地获取，如果没有向服务端获取。  
协商缓存：客户端在本地获取请求标识，带着这个标识去服务端请求内容，如果请求缓存没有过期，返回304，在本地获取请求数据，如果过期就在服务端获取请求数据。  

强制缓存的实现  
```
   Cache-Control:max-age=300(以秒为单位)
```
协商缓存的实现  
Last-Modified:HTTP response headers中返回Last-modified返回头标识了此资源最后在服务端请求的时间。  
Etag：服务端针对这个资源通过算法返回一个唯一的值。  

##### 浏览器缓存全过程  
1. 浏览器第一次加载资源，返回200，重服务端获取资源，把资源保存到本地以及response header.     
2. 第二次加载资源，先走强缓存，cache-control的max-age有没有超时，如果没有超时，直接走强制缓存。  
3. 没走强缓存，则进行协商缓存，根据etag值，判断是否和上次请求一样，如果一样返回304，如果不一样返回200，重新加载资源。 

##### 缓存保存到哪里？
Service Worker  
Service Worker 运行在 JavaScript 主线程之外，虽然由于脱离了浏览器窗体无法直接访问 DOM，但是它可以完成离线缓存、消息推送、网络代理等功能。  
Memory Cache  
Memory Cache 就是内存缓存，它的效率最快，但是存活时间最短，你一关掉浏览器 Memory Cache 里的文件就被清空了。  
Disk Cache  
Cache 资源被存储在硬盘上，存活时间比 Memory Cache 要持久很多。  

##### 说说你所知道的性能优化的方法？
1. 使用cdn，通过dns负载均衡技术请求最近的chache服务器，以最快的速度请求服务器内容，也可以放一些静态资源放在cdn服务器上。  
2. 合理利用缓存，使用chache-control与etag设置。  
3. 使用雪碧图，合并js方法，减少请求数量。
4. 合并css，js，减少请求的体积，服务端可以使用Gzip压缩。  
5. 使用外联css与js，css放在头部（浏览器会等css加载后在渲染，避免重排，放在尾部会出现白屏），js放在尾部，减少页面阻塞并发请求，使用代码拆分及延迟加载
6. 频繁操作demo时使用fragment，减少重排。
7. 图片颜色复杂体积大优先使用jpg，图片小不复杂例如图标优先使用PNG8，图片颜色复杂半透明效果使用PNG24.
8. 减少回流与重排，重绘。

##### 防抖与节流
节流函数
```
const throttle = (fn, delay=3000) => {
  let pre = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - pre > delay) {
      fn.apply(this, args);
      pre = now;
    }
  };
}
let throttlefn = throttle(function(){console.log('执行的内容')},2000)
```
防抖函数
```
const debounce = (func, time) => {
  let timer = null;
  return (...args) => {
    let This = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(This, args);
      timer = null;
    })
  }
}
```
#### 什么是XSS攻击？如何防止XSS攻击？
XSS是跨站脚本攻击，是web应用计算机安全漏洞，通过代码嵌入页面当中。  
防止攻击的方法：  
1. 在输入时进行转码，如html中<>标签等特殊符号。  
2. Cookie设置httponly，防止用户通过document.cookie获取到cookie，⚠️此http头由服务端设置。  
3. 重url获取值的时候一定要进行格式检查。  
4. 不是用eval解析运行不确定的数据，json解析请使用JSON.parse。  
5. 服务端也应该做的关键字的过滤。  

### HTTP/HTTPS协议
#### get与post区别
get只是请求数据，会保存到浏览器历史记录，可以缓存，可以通过url访问，经过url传参，是幂等的不会有副作用，不会给服务器增加负担。  
post不会有缓存，不能保存到浏览器记录中，非幂等的，会给服务器增加负担。  

#### http状态码  
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



## git基本操作
#### 文件名（泛指文件路径+文件名）例如'/home/index.html'
#### commit指git log时commit后的id,取前七位即可
#### 标签名即为名称例如'v1.0
#### 分支名也为名称除了master以外
git status 查看当前状态  
git fetch/git pull     拉取代码  
git add .              所有代码添加到暂存区  
git commit -m '信息'   暂存区提交  
git push  origin master    提交到远程  
git rm '文件名'         删除  
git mv '文件名'         重命名/移动文件  
git log --pretty=oneline '文件名'     查看文件前后变化（用得到的id，git show 得到的id ，也能看见具体的变化）  
git log --oneline  查看简写的提交记录  
git log --oneline --graph 查看版本路线  
git log -p '文件名'                   具体修改的内容  
git diff   查看文件不同（针对改动少）  
git checkout -- '文件名'   当前文件还原到上一次提交的状态（已追踪时无效，在暂存区属于已追踪）  
git reset HEAD '文件名'    撤销文件的追踪  
git reset --hard HEAD^     回到上一版本（两个^^就是回退到前两个版本）  
git reset --hard 'commitid'      回到指定版本  
git checkout 'commitid' -- '文件名' 将指定文件回退到指定版本  
git tag '标签名' 创建标签  
git tag  查看标签  
git tag '标签名' 'commitid'  为之前的项目创建标签  
git tag -d '标签名' 删除标签  
git push origin '标签名' 标签名推送到远程仓库  
git branch '分支名' 创建分支  
git branch  查看分支  
git checkout '分支名' 切换分支  
git branch -d '分支名' 删除分支（不能删除当前所在分支）  
git push origin --delete '分支名' 删除远程分支  
git checkout -b test 创建并切换分支  
git branch -D '分支名' 强制删除分支  
git merge '分支名' 合并分支（合并分支，需要切换到要合并分支上，例如dev分支合并到master分支,要切换到master分支，在执行此合并命令）  
###### 合并冲突时：
* git merge --abort 保留当前分支的代码，忽略其他分支的代码。  
* 手动解决冲突：  
去掉前后及中间等号，保留想要的代码 => git status查看一下是不是同时修改了一个文件=> git add . => git commit => 进入可编辑界面 => i 进入可编辑状态输入解决状态的备注 => :wq 保存退出 => git commit 如果没有冲突后 => git commit -m '解决冲突后的代码' => git push origin master 推送到远程分支  
* git merge --abort 保留当前分支的代码，忽略其他分支的代码。 
* git merge --abort 保留当前分支的代码，忽略其他分支的代码。 

## VUE
### 生命周期 
1. beforeCreate:此时data，method还没有初始化，可以使用loding。  
2. Created：此时data，method已经初始化，可以在此初始化data数据及method方法自执行。  
3. beforMount:编译模版在el上面挂载虚拟dome节点。  
4. Mounted：编译模版在el上面挂载真实的dome节点。
5. beforeUpdate:数据更新时触发，重新渲染虚拟dome。
6. Updated：数据更新完成后触发。  
7. beforeDestory：组件销毁前触发，此时watchers，子组件和事件销毁。  
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
🌿重点理解：Object.definePropety可以设置对象的属性这一特性。  

### 组件传值
1. 通过propos传递  
2. 通过$emit触发自定义事件
3. 使用ref
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
5. parent或root
兄弟组件  
```
this.$parent.emit('add')
```
另一个兄弟组件  
```
this.$parent.on('add',this.add)
```
6. attrs与listeners
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
7. Provide与Inject
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
8. Vuex
小结  
父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择ref  
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递  
祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject  
复杂关系的组件数据传递可以通过vuex存放共享的变量  

## 面试
自我介绍：  
您好，我叫陈启元，来自辽宁丹东，今年26岁，毕业于辽宁科技学院，主修计算机科学与技术，17年11月任职中企聚易（北京）网络科技有限公司，前端开发，主要用的的技术栈是js和jq,负责凯旋网和蜗科找工两个项目的前端工作，主要职责是页面开发，动画效果与业务逻辑的实现。19年4月任职北京嘉楼信息技术有限公司，前端开发工程师职位，主要用的的技术栈是vue,angular以及微信小程序，负责retail,pmc,scrm等项目的业务开发，框架的搭建，gis的前端开发等。以上是我的自我介绍，谢谢。
