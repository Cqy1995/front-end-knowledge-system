//先来个简单的例子感受一下
var stu = {
    name:"tom",
    age: 18,
  };
  
  function say() {
    console.log(`my name is ${this.name},${this.age} years old`);
  }
  
say.call(stu); // my name is tom,18 years old

//改写后如下
var stu = {
    name: "tom",
    age: 18,
    say() {
      console.log(`my name is ${this.name},${this.age} years old`);
    }
  
  };
  
  //调用
  stu.say() //my name is tom,18 years old
/**
 * call
 * 
 * **/
Function.prototype.mycall = function(context){
    //这里的context相当于上述stu
    //这里的this指向目标调用函数,相当于上述say
    //这里可以理解为为stu添加say方法
    context.fn = this;
    context.fn();
    delete context.fn
}

Function.prototype.mycall = function(content = window,...args){
    context.fn = this;
    let result = content.fn(...args);
    delete content.fn;
    return result
}

/**
 * apply
 * 
 * **/

 Function.prototype.myapply = function(content = window,args=[]){
  content.fn = this;
  let result = content.fn(...args);
  delete content.fn;
  return result
 }

