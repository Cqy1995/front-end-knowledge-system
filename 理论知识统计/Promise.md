### promise是什么？

主要用于异步计算
可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
可以在对象之间传递和操作promise，帮助我们处理队列

### 为什么会有promise?

为了避免界面冻结
解决回调地狱

### 异步操作常见语法
事件监听
```
document.getElementById('#start').addEventListener('click', start, false);
function start() {
  // 响应事件，进行相应的操作
}
// jquery on 监听
$('#start').on('click', start)
```

2.回调
```
// 比较常见的有ajax
$.ajax('http://www.wyunfei.com/', {
 success (res) {
   // 这里可以监听res返回的数据做回调逻辑的处理
 }
})

// 或者在页面加载完毕后回调
$(function() {
 // 页面结构加载完成，做回调逻辑处理
})
```
### 异步回调的问题?
之前处理异步是通过纯粹的回调函数的形式进行处理
很容易进入回调地狱，剥夺了函数return的能力
问题可以解决，但是难以读懂，维护困难
稍有不慎就会踏入回调地狱-嵌套层次深，不好维



一般情况下我们一次性调用API就可以完成请求你，但是有些情况需要多次调用服务器API，就会形成一个链式调用，比如为了完成一个功能，我们需要调用API1，API2,API3,依次按照顺序进行调用，这个时候就会出现回调地狱的问题

### promise
promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
并未剥夺函数return的能力，因此无需层层传递callback，进行回调获取数据
代码风格，容易理解，便于维护
多个异步等待合并便于解决

```
new Promise(
  function (resolve, reject) {
    // 一段耗时的异步操作
    resolve('成功') // 数据处理完成
    // reject('失败') // 数据处理出错
  }
).then(
  (res) => {console.log(res)},  // 成功
  (err) => {console.log(err)} // 失败
)
```
resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从pending变为resolved），在异步操作成功时调用，并将异步操作结果，作为参数传递出去；reject作用是，将promise对象的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

### Promise有三个状态：

pending[待定]初始状态
fulfilled[实现]操作成功
rejected[被否决]操作失败
当Promise状态发送改变，就会触发then()里的响应函数处理后续步骤；promise状态一经改变，不会再变
Promise对象的状态改变，只要两种可能：从pending变为fulfilled；从pending变为rejected
示例：
```
new Promise(resolve => {
  setTimeout(() => {
    resolve('hello')
  }, 2000)
}).then(res => {
  console.log(res)
})
```
分两次顺序执行
```
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  }).then(val => {
    console.log(val) //  参数val = 'hello'
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world')
      }, 2000)
    })
  }).then(val => {
    console.log(val) // 参数val = 'world'
  })
  ```
Promise完成后then()
```
let pro = new Promise(resolve => {
   setTimeout(() => {
     resolve('hello world')
   }, 2000)
 })
 setTimeout(() => {
   pro.then(value => {
   console.log(value) // hello world
 })
 }, 2000)
 ```
Promise作为队列最为重要的特性，我们在任何一个地方生成一个promise队列后，我们可以把他作为一个变量传递到其他地方
then正常返回resolved，里面有报错则返回rejected；catch正常返回resolved，里面有报错则返回rejected

### 加入在.then()的函数里面不返回新的promise，会怎样？
### .then
接收两个函数作为参数，分别代表fulfilled（成功）和rejected（失败）
.then()返回一个新的Promise实例，所以它可以链式调用
当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
状态响应函数可以返回新的promise，或其他值，不返回值也可以我们可以认为它返回一个null
如果返回新的promise，那么下一级.then()会在新的promise状态改变之后执行
如果返回其他任何值，则会立即执行下一级.then()

### .then()里面有.then()的情况
1.因为.then()返回的还是Promise实例
2.会等里面的.then()执行完，再执行外面的

### 错误处理
reject('错误信息').then(()=>{},)
throw new Error('错误信息').catch(()=>{错误处理逻辑})

### Promise.all()批量执行
```
//切菜
    function cutUp(){
        console.log('开始切菜。');
        var p = new Promise(function(resolve, reject){        //做一些异步操作
            setTimeout(function(){
                console.log('切菜完毕！');
                resolve('切好的菜');
            }, 1000);
        });
        return p;
    }

    //烧水
    function boil(){
        console.log('开始烧水。');
        var p = new Promise(function(resolve, reject){        //做一些异步操作
            setTimeout(function(){
                console.log('烧水完毕！');
                resolve('烧好的水');
            }, 1000);
        });
        return p;
    }

    Promise.all([cutUp(), boil()])
        .then((result) => {
            console.log('准备工作完毕');
            console.log(result);
        })
```

### Promise.race()与Promise.all()类似，区别在于它有任意一个完成就算完成
### Promise.allSettled功能和Promise.all()类似，Promise.all()必须全部resolved,才可以通过.then的回调

```
let p1 = new Promise(resolve => {
        setTimeout(() => {
            resolve('I\`m p1 ')
        }, 1000)
    });
    let p2 = new Promise(resolve => {
        setTimeout(() => {
            resolve('I\`m p2 ')
        }, 2000)
    });
    Promise.race([p1, p2])
        .then(value => {
            console.log(value)
        })
```

### 回调地狱与promise对比
```	
/***
   第一步：找到北京的id
   第二步：根据北京的id -> 找到北京公司的id
   第三步：根据北京公司的id -> 找到北京公司的详情
   目的：模拟链式调用、回调地狱
 ***/
 
 // 回调地狱
 // 请求第一个API: 地址在北京的公司的id
 $.ajax({
   url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/city',
   success (resCity) {
     let findCityId = resCity.filter(item => {
       if (item.id == 'c1') {
         return item
       }
     })[0].id
     
     $.ajax({
       //  请求第二个API: 根据上一个返回的在北京公司的id “findCityId”，找到北京公司的第一家公司的id
       url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/position-list',
       success (resPosition) {
         let findPostionId = resPosition.filter(item => {
           if(item.cityId == findCityId) {
             return item
           }
         })[0].id
         // 请求第三个API: 根据上一个API的id(findPostionId)找到具体公司，然后返回公司详情
         $.ajax({
           url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/company',
           success (resCom) {
             let comInfo = resCom.filter(item => {
               if (findPostionId == item.id) {
                 return item
               }
             })[0]
             console.log(comInfo)
           }
         })
       }
     })
   }
 })
```
```
// Promise 写法
  // 第一步：获取城市列表
  const cityList = new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/city',
      success (res) {
        resolve(res)
      }
    })
  })

  // 第二步：找到城市是北京的id
    cityList.then(res => {
      let findCityId = res.filter(item => {
        if (item.id == 'c1') {
          return item
        }
      })[0].id
      
      findCompanyId().then(res => {
        // 第三步（2）：根据北京的id -> 找到北京公司的id
        let findPostionId = res.filter(item => {
            if(item.cityId == findCityId) {
              return item
            }
        })[0].id

        // 第四步（2）：传入公司的id
        companyInfo(findPostionId)

      })

    })

  // 第三步（1）：根据北京的id -> 找到北京公司的id
  function findCompanyId () {
    let aaa = new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/position-list',
        success (res) {
          resolve(res)
        }
      })
    })
    return aaa
  }

// 第四步：根据上一个API的id(findPostionId)找到具体公司，然后返回公司详情
function companyInfo (id) {
  let companyList = new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/company',
      success (res) {
        let comInfo = res.filter(item => {
            if (id == item.id) {
               return item
            }
        })[0]
        console.log(comInfo)
      }
    })
  })
}
```

### 手写promise
```
const PENDING = Symbol();
const REJECT = Symbol();
const FULLFILLED = Symbol();

const MyPromise = function(fn){
    this.state = PENDING;
    this.value = '';
    const resolve = (val)=>{
        this.state = FULLFILLED;
        this.value=val;
    }
    const rejcect = (err)=>{
        this.state = REJECT;
        this.value = err;
    }
    this.then = (onfullfilled,onreject)=>{
        if (this.state == FULLFILLED) {
            onfullfilled(this.value)
        }else{
            onreject(this.value)
        }
    }
    try {
        fn(resolve,rejcect)
    } catch (error) {
        rejcect(err)
    }
}
```
