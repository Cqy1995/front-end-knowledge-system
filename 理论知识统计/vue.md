#VUE知识点总结

### 生命周期 
1. beforeCreate:此时data，method还没有初始化，可以使用loding。  
2. Created：此时data，method已经初始化，可以在此初始化data数据及method方法自执行。  
3. beforMount:编译模版在el上面挂载虚拟dome节点。  
4. Mounted：编译模版在el上面挂载真实的dome节点。
5. beforeUpdate:数据更新时触发，重新渲染虚拟dome。
6. Updated：数据更新完成后触发。  
7. beforeDestory：组件销毁前触发，此时watchers，子组件和事件销毁。  
8. Destoryed：组件销毁后触发。 

##### 带有子组件的生命周期:
1. 渲染过程:  父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
2. 更新过程:　父beforeUpdate->子beforeUpdate->子updated->父updated  
3. 销毁过程:  父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

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
在监听一个事件的时候,通常是一个事件的名字,方便在beforeDestroy中进行解绑this.$bus.$off('foo',this.addTitleHandler).防止内存泄露

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
8. 小结  
父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择ref  
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递  
祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject  
复杂关系的组件数据传递可以通过vuex存放共享的变量  


### vue双向绑定原理
vue采用数据劫持+发布-订阅模式实现,通过Object.defineProperty()来劫持各个属性的getter,setter,在数据变化时发布消息给订阅者,触发相应的监听回调.

mvvm 的双向绑定:
1. 数据劫持,实现数据监听器Observer,对数据对象所有属性进行监听,一旦改变拿到最新值并通知订阅者
2. 模版的编译,实现指令解析器complie,对每个节点指令进行扫描和解析,根据指令模板替换数据,已经绑定相应的更新函数 
3. 实现一个Watcher,作为Observer和complie的桥梁,
    - 能够订阅并接收每个属性变动的通知(在自身实例化时往属性订阅器(dep)里面添加自己)
    - 执行指令绑定相应的回调函数(待属性变化dep.notify()通知时,调用自身update,并且触发compile绑定的回调)
    - 更新视图(自身必须有一个update方法)
4. 收集订阅者,通知订阅者更新

![vue mvvm](https://raw.githubusercontent.com/Cqy1995/front-end-knowledge-system/main/images/vue-mvvm.png)

```
// 上文省略...
defineReactive(obj,key,value){
    // 递归遍历
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(obj,key,{
      enumerable: true,
      configurable: false,
      get(){
        // 订阅数据属性时，往Dep中添加观察者，进行依赖收集
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      // 通过箭头函数改变this指向到class Observer
      set:(newVal)=>{
        this.observe(newVal)
        if(newVal !== value){
          value = newVal
          // 如果新旧值不同，则告诉Dep通知变化
          dep.notify()
        }
      }
    })
  }

```
🌿再次梳理：   
最开始，我们实现了 Compile 来解析指令，找到 {{xxx}}、指令、事件、绑定等等，然后再初始化视图。但此时还有一件事情没做，就是当数据发生变化的时候，在更新数据之前，我们还要订阅数据变化，绑定更新函数，此时就需要加入订阅者Watcher了。当订阅者观察到数据变化时，就会触发Updater来更新视图。   

当然，创建 Watcher的前提时要进行数据劫持来监听所有属性，所以创建了 Observer.js 文件。在 get方法中，需要给 Dep 通知变化，此时就需要将 Dep 的依赖收集关联起来，并且添加订阅者 Watcher（这个 Watcher 在 Complie 订阅数据变化，绑定更新函数时就已经创建了的）。此时 Dep 订阅器里就有很多个 Watcher 了，有多少个属性就对应有多少个 Watcher。  

那么，我们举一个简单例子来走一下上述流程图：   

假设原本 data 数据中有一个 a:1，此时我们进行更新为 a:10，由于早已经对我们的数据进行了数据劫持并且监听了所有属性，此时就会触发 set 方法，在 set方法里就会通知 Dep 订阅器发生了变化，然后就会通知相关 Watcher 触发 update 函数来更新视图。而这些订阅者 Watcher 在 Complie 订阅数据变化，绑定更新函数时就已经创建了。

🌿最终梳理:

vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的getter，setter，在数据变动时发布消息给订阅者，触发相应的监听回调。   

MVVM作为数据绑定的入口，整合Observer、Compile 和 Watcher 三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。   

### 双向绑定之数组
```
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(item=>{
	Object.defineProperty(arrayMethods,item,{
	    value:function mutator(){
	    	//缓存原生方法，之后调用
	    	const original = arrayProto[item]	
	    	let args = Array.from(arguments)
		    original.apply(this,args)
		    const ob = this.__ob__
		    ob.dep.notify()
	    },
	})
})
```
### diff算法
Vue的Diff算法,只比较同级的节点，若找不到与新节点类型相同的节点，则插入一个新节点，若有相同类型的节点则进行节点属性的更新，最后删除新节点列表中不包含的旧节点。    

Vue中的Diff算法采用了React相似的思路，都是同层节点进行比较，在比较的过程中，使用了一些优先判断和就地复用策略，提高了Diff算法的效率。

### this.$nextTick
- 当dom更新渲染完成后触发

**vue渲染是异步的,更新数据dom不是立即渲染,this.$nextTick原理**
- 触发事件,创建一个执行栈,同步代码根据执行栈执行,此时不更新dom
- 异步代码推送到队列中,如果遇到相同的更新dom操作,只会保留一个
- 同步执行栈任务执行完毕后,执行异步队列任务,此时才更新demo
- 然后触发nexttick回调

### VUEX
vuex是状态管理模式，多个组件共享状态时使用。

流程：     

- 页面通过mapAction异步提交事件到action。
- action通过commit把对应参数同步提交到mutation，mutation会修改state中对应的值。
- 最后通过getter把对应值跑出去，在页面的计算属性中，通过，mapGetter来动态获取state中的值

vuex五种属性:
1. state：vuex的基本数据，用来存储变量
2. geeter：从基本数据(state)派生的数据，相当于state的计算属性
3. mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
4. action：和mutation的功能大致相同，不同之处在于 ==》1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
5. modules(就是mapAction) ：模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。 

vuex使用api
- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations
  
### 事件
- 事件的evnet对象是原生的(event._proto_.constructor == 原生event)
- 事件挂载到当前元素
- 修饰符: .stop .prevent .capture .self .once .passive

### 组件上实现v-modle
1. props接收value属性
2. 新的value时$emit触发input事件


