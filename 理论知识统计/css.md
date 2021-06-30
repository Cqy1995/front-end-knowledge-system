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
2. 上下的间距由 margin，同一 BFC 的子盒子margin会重叠。
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

##### margin纵向重叠,只会取最大margin值

##### margin为负值的时候,top,bottom,right,left分别有什么效果
- top为负,都会向上移动
- bottom为负,除了第一个都会向上移动
- left为负,向左移动
- right为负,不移动(如果宽度是屏幕100%时,会出现滚动条)


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


#### 圣杯布局和双飞翼布局


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




