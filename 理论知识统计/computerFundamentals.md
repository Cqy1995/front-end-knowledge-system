## 计算机基础

### 设计模式
设计模式是将代码中不变的地方保留，变化的地方抽离出来。
#### 常见设计模式
1. 观察者模式
2. 发布-订阅模式
3. 单例模式
4. 策略模式
5. 代理模式
   
##### 观察者模式
简易版EventEmitter
```js
class Subject{
    constructor(){
        this.observers = [];
    }
    add(observer){
        this.observers.push(observer)
    }
    notify(...args){
        this.observers.forEach(observer => observer.log(...args))
    }
}
class observer(){
    log(...args){
      console.log(...args)  
    }
}
const obj1 = new observer();
const obj2 = new observer();
const sub = new Subject();
sub.add(obj1);
sub.add(obj2);
sub.notify('hello emitter 观察者模式')
```
##### 发布订阅模式
简易版EventEmitter
```js
class EventEmitter{
    constructor(){
        this._events = {}
    }
    on(type,listener){
        this._events[type] = listener;
    }
    emit(type,...args){
        if(this._events[type]){
            this._events[type].call(this,...args)
        }
    }
}
const eimmter = new EventEmitter();
eimmter.on('log',function(param){
    console.log(param)
})
eimmter.emit('log','hello emitter，发布订阅')
```