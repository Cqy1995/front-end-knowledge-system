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


#### HTML5新特性,移除了哪些内容
- 画布canvas
- 音视频audio/video
- 本地存储localStrage,会话存储seesionStrage
- 语义化标签article,header,footer,section
- 表单控件date,time,email,url
- 拖拽api
- websocket,webworker,Geolocation(地理定位)
移除的内容 (了解)
- 纯表现的元素：basefont、big、center、font、s、strike、tt、u
- 对可用性产生负面影响的元素：frame、frameset、noframes

#### HTML语义化
- 可读性强,便于开发与维护
- 让搜索引擎更容易理解(seo)

#### 默认情况下,哪些是块级元素,哪些是行内元素
- dispaly:block/table;有div,h1,h2,table,ul,ol,p;
- dispaly:inline/inline-block;有span img button input 