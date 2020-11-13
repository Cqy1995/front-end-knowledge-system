# 前端知识点体系梳理
前端知识体系，从头到尾分为各个模块，打通奇经八脉。

## Javascript

### 函数的调用
作为独立函数调用，在非严格模式下this指向windows，严格模式下指向underfind。
作为对象的方法调用，this指向该对象。
作为构造函数调用，看是独立函数调用还是属于方法调用。
apply,call,bind可以改变this指向。
箭头函数
### 闭包
变量：用于存储数据的容器；
标识符：代码中用来标识变量、函数、或属性的字符序列。
执行上下文：评估和执行 JavaScript 代码的环境的抽象概念。（全局，函数，eval函数）。
词法作用域：JavaScript 从标识符到变量的映射机制，在词法分析阶段生成的作用域，词法分析阶段，就可以理解为写代码阶段。
闭包：由于浏览器的垃圾回收机制，在JavaScript中，函数是第一公民，所以函数可以被当作一个普通的变量传递，所以函数在运行时可能会看起来已经脱离了原来的词法作用域。但是由于函数的作用域早就在词法分析时就确定了，所以函数无论在哪里执行，都会记住被定义时的作用域。这种现象就叫作闭包。<br/>
闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。</br>
本来是函数执行完毕，执行环境销毁，对应的变量对象销毁，但是当A函数内的B函数将A函数的活动对象添加到他的活动对象，当B被全局变量接受不了后，A函数内部的活动对象就不会消失，因此就可以访问到A函数内部变量；</br>
注意：它只能取得这个变量的最后最终值</br>
重点：一定要函数返回配合匿名函数；</br>
#### 综上所述,😊闭包是词法作用域和函数是JavaScript的第一公民相互所用自然而然产生的现象。
### 原型与继承
每个函数都有prototype属性，指向原型对象。
每个对象有个__proto__属性，指向该对象的原型。（普通对象没有prototype属性）。
function Person() {}</br>
var person = new Person();</br>
person.__proto__ === Person.prototype</br></br>
实例的 __proto__ 指向构造函数的 prototype </br>
原型的概念：对象创建，就会与之关联另一个对象，这个对象就是原型，每一个对象都会从原型中“继承”属性。</br>
每个原型都有一个constructor属性，指向该关联的构造函数。</br>
Person===Person.prototype.constructor(constructor是prototype上的属性，这一点很容易被忽略掉。)</br>
person instanceof Person ==> true </br>
constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；而instanceof比较松散，只要检测的类型在原型链上，就会返回true。
### 异步函数与promise
宏任务：同步script（整体代码），setTimeout回调函数，setInterval回调函数，I/O,UI renderding。
微任务： process.nextTick, Promise 回调函数，Object.observe，MutationObserver。
代码执行顺序：</br>
1，执行整体代码。进入栈中。
2，如果发现微任务，把微任务放在微任务队列中。
3，继续执行同步代码，同步代码（本次宏任务）执行完毕后，执行微任务，微任务队列清空。
4，上一个宏任务出栈，进入下一个宏任务。
5，如此循环，直到宏任务与微任务清空。
### 类型与类型转换
基本类型：Number,String,Boolean,Null,Undefined,Symbol,Bigint.（按值访问）</br>
引用类型：Array,Object,Function,RegExp(正则)。（按引用访问）</br>
##### 判断:
typeof检测基本类型，都会得到相应的类型（除了null，所有判断变量是否是null：(!a && typeof a == 'object')）。</br>
typeof检测引用类型，基本都是object,除了function.</br>
Object.prototype.toString.call()可以判断任何类型</br>
##### 转换：
类型的转换总是得到number,string,boolean.</br>
string=>number:Number('10'),+'10',ParseInt('10a'),parseInt允许传入非数字字符 (例如px)，其从左往右解析，遇到非数字字符就会停下。而Number不允许传入非数字字符。</br>
number=>string:String(10),10+'',10.tostring().</br>
任何值=>boolean:Boolean(值)，!!值。</br>
##### 隐式转换：
+操作符: 1+'a'=>'1a' ,1+false=>1 ,'1'+false=>'1false' ,false+true=>1.</br>
-、*、\操作符: 1 * '23' => 23, 1 * false => 0, 1 / 'aa' => NaN</br>
==操作符: 3 == true // false, 3 转为number为3，true转为number为1,'0' == false //true, '0'转为number为0，false转为number为0,'0' == 0 // '0'转为number为0</br>
<和>比较符:</br>
如果两边都是字符串，则比较字母表顺序：</br>
'ca' < 'bd' // false</br>
'a' < 'b' // true</br>
其他情况下，转换为数字再比较：</br>
'12' < 13 // true</br>
false > -1 // true</br>
以上说的是基本类型的隐式转换，而对象会被ToPrimitive转换为基本类型再进行转换：</br>
var a = {}</br>
a > 2 // false</br>

### 其他常见考点
##### enerator 函数
特殊的函数，声明的时候function*，会返回多次，yield控制一次次返回。</br>
它的使用场景是：使用特定的规则，生成数据。比如生成 ID，生成编号等等.</br>
##### encodeURL和encodeURLComponent
encodeURI用来处理整个 URI，所以它不会转义&, ?, /, =等完整URI必备字符，而encodeURIComponent会转义那些特殊字符，所以通常只用它来转义URI的参数。比如手工拼URI时对键值对使用encodeURIComponent进行转义。
##### 立即执行函数 (IIFE)
IIFE,立即执行函数使用场景，函数只执行一次没有必要给它起名字。
##### 函数在 JavaScript 中是第一公民 (first-class)
可以作为函数的参数，也可以作为函数的返回值，也可以作为普通对象有自己的键值对，也可以push到数组中。**函数可以当成普通对象看待**</br>
#####  arguments 参数是类数组
arguments对象有length等属性，但它是伪数组，不能使用数组的方法。</br>
可以使用三种方法，将伪数组转换成数组。</br>
const arrArgs = Array.from(arguments) </br>
const arrArgs = [...arguments]</br>
const arrArgs = Array.protype.call(arguments)
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
## CSS😏
### css基础
#### 优先级规则
优先级由高到低：</br>

!important</br>
匹配优先级计算，详情见下文</br>
若以上规则都无法解决，后来者优先级高</br>
user agent stylesheet</br>

优先级计算：A:内联样式 B:id选择器 C:类选择器/属性选择器/伪类 D：标签选择器/伪元素</br>
⚠️少使用!important尤其是在npm这种。伪类是单:，伪元素是双::</br>
user agent stylesheet是浏览器默认的样式，不同浏览器不通

#### 盒模型
标准模式下，box-sizing的值为content-box，当给一个盒子设置宽高后，实际是给content设置宽高，所有的 padding、border 再往外扩展</br>
IE下：box-sizing的值为border-box,当给一个盒子设置宽高后，指定的宽高是包含 border 和 padding
#### margin
对于行内替换元素来说，4 个方向的margin都是起作用的；</br>
对于行内非替换元素来说，只有margin-left和margin-right起作用，margin-top和margin-bottom是不起作用的。
#### vertical-align在display:inline与table-cell起作用。
#### 元素垂直居中

当不需要指定元素的高度时，可以直接给一个相同的padding-top和padding-bottom，让元素和padding一起撑起来容器；</br>
需要指定容器高度，或者不能使用padding的时候，设置元素display: table-cell 和 vertical-align: middle；</br>
不需要严格的兼容，可以用 flexbox 的话，就使用flexbox；</br>
内容只有一行文本时，把容器的line-height属性设置为和容器的高度一样；</br>
上面的方法都不能用时，如果知道容器和元素的高度，用绝对定位；</br>
如果不知道元素的高度时，结合定位和transform一起用。</br>

### CSS层叠上下文
HTML元素层级是所谓的文档流,CSS层叠上下文是文档流的子层叠。</br>
一个页面中可能会有很多个层叠上下文，而层叠上下文之间是独立的。层叠上下文里有一套自己的排列规则</br>
1,层叠上下文之间如何排列?
**1，对于未定位元素，按照在元素在 HTML 文档中出现的顺序决定，越后面的元素越会覆盖在上面；**</br>
**2，先渲染未定位元素，再渲染定位元素**</br>
2,层叠上下文内部如何排序?(由上到下)⚠️只有定位元素才可以比较z-index
**1,z-index为正值的定位元素。**
**2,z-index为auto的定位元素。**
**3,未定位的元素**
**4,z-index为负值的定位元素。**
**5,层叠上下文的根元素**</br>

## git基本操作
#### 文件名（泛指文件路径+文件名）例如'/home/index.html'
#### commit指git log时commit后的id,取前七位即可
#### 标签名即为名称例如'v1.0
#### 分支名也为名称除了master以外
git status 查看当前状态
git fetch/git pull     拉取代码<br/>
git add .              所有代码添加到暂存区<br/>
git commit -m '信息'   暂存区提交<br/>
git push  origin master    提交到远程</br>
git rm '文件名'         删除<br/>
git mv '文件名'         重命名/移动文件<br/>
git log --pretty=oneline '文件名'     查看文件前后变化（用得到的id，git show 得到的id ，也能看见具体的变化）<br/>
git log --oneline  查看简写的提交记录<br/>
git log --oneline --graph 查看版本路线<br/>
git log -p '文件名'                   具体修改的内容<br/>
git diff   查看文件不同（针对改动少）<br/>
git checkout -- '文件名'   当前文件还原到上一次提交的状态（已追踪时无效，在暂存区属于已追踪）<br/>
git reset HEAD '文件名'    撤销文件的追踪<br/>
git reset --hard HEAD^     回到上一版本（两个^^就是回退到前两个版本）<br/>
git reset --hard 'commitid'      回到指定版本<br/>
git checkout 'commitid' -- '文件名' 将指定文件回退到指定版本<br/>
git tag '标签名' 创建标签<br/>
git tag  查看标签<br/>
git tag '标签名' 'commitid'  为之前的项目创建标签<br/>
git tag -d '标签名' 删除标签<br/>
git push origin '标签名' 标签名推送到远程仓库<br/>
git branch '分支名' 创建分支<br/>
git branch  查看分支<br/>
git checkout '分支名' 切换分支<br/>
git branch -d '分支名' 删除分支（不能删除当前所在分支）<br/>
git push origin --delete '分支名' 删除远程分支
git checkout -b test 创建并切换分支<br/>
git branch -D '分支名' 强制删除分支<br/>
git merge '分支名' 合并分支（合并分支，需要切换到要合并分支上，例如dev分支合并到master分支,要切换到master分支，在执行此合并命令）
###### 合并冲突时：
* git merge --abort 保留当前分支的代码，忽略其他分支的代码。
* 手动解决冲突：
去掉前后及中间等号，保留想要的代码 => git status查看一下是不是同时修改了一个文件=> git add . => git commit => 进入可编辑界面 => i 进入可编辑状态输入解决状态的备注 => :wq 保存退出 => git commit 如果没有冲突后 => git commit -m '解决冲突后的代码' => git push origin master 推送到远程分支<br/>
