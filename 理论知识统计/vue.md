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
8. 小结  
父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择ref  
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递  
祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject  
复杂关系的组件数据传递可以通过vuex存放共享的变量  

### 组件上实现v-modle
1. props接收value属性
2. 新的value时$emit触发input事件

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