# VUE3
### vue3比vue2有什么优势?
- 性能好
- 体积更小
- 更好的ts支持
- 更好的逻辑抽离
- 更好的代码组织
- 更多新功能

### vue3的生命周期
注:两种写法都可以
1. Options API
    - beforDestroy改为beforUnmount
    - destroy改为unmouted
    - 其他沿用vue2的生命周期
2. Compsition API
    - 去掉beforCreate与create
    - 新增setup
    - 其他的改名字
        - onBeforeMount/onMounted
        - onBeforeUpdate/onUpdated
        - onBeforeUnmount/onUnmounted

### Composition API 与 Options API
1. Composition API  
    - 更好的代码组织(代码清晰,官网不同颜色不过逻辑那个图)
        - data里面定义的很多数据,数据又和下面的方法管理,这样就不能把数据和对应的方法放在一起
        - 通过函数定义到一块,分成逻辑块,统一在setup中调用,统一返回
    - 更好的逻辑复用
    - 更好的类型推导
        - vue2中this数据和方法,vue3中在哪定义在哪引用很清晰
2. Options API
    - 使用方法固定
如何选择
- 不建议共用,会引起混乱
- 小项目,逻辑简单还用options API
- 中大项目,逻辑复杂,用comptions API

### ref与reactive / toRef与toRefs
1. toRef:把某一个属性转成ref响应式
    - toRef第一个参数是reactive对象,第二个参数是属性
        - 如果第一个参数是普通对象,产出的结果不具备响应式
    - 返回一个ref ,具有响应式
    - reactive对象与返回的ref对象,两者保持响应式
2. toRefs:把里面每个属性变成ref响应式
    - 将响应式对象(reactive)转为普通对象
    - 这个普通对象的每个属性都对应一个ref
    - 两者保持引用关系
注意:想要整个对象是响应式,使用reactive,如果直接解构返回reactive对象,失去响应式,所以必须配合toRef与toRefs

#### 最佳使用方式
- 用reactive做对象的响应式,用ref做值类型响应式(通过.value获取赋值)
- setup中返回toRefs(state),或者toRef(state,'xxx')
    - 注意上面两点:定义时用reactive与ref定义,返回的时候用toRef与toRefs
- ref的变量命名都要xxxRef
- 合成函数返回响应式对象时,使用toRefs有利于解构

#### 深入思考 
1. 为何需要ref?
    - 值类型不具有响应式(proxy对象代理),值类型无处不在
    - 如在setup,computed,合成函数,都有可能返回值类型,难免会遇到值类型
    - vue如不定义ref,用户将自造ref
2. 为何需要.value?响应式:原理对象是引用类型
    - ref是一个对象,value属性存储值
    - 通过.value属性的get和set实现响应式
    - 用于模板,reactive时不需要.value
3. 为何需要toRef与toRefs
    - 初衷:在不丢失响应式情况下,把对象数据解构(去掉state.xxx)
    - 前提:针对响应式对象
    - 注意:不创造响应式,而是延续响应式