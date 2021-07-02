//函数作为返回值
function create(){
    const a = 100;
    return function(){
        console.log(a)
    }
}
const fn = create()
const a = 200
fn() // 100

//函数作为参数传递
function print(fn){
    let a = 200;
    fn()
}
const a = 100;
function fn(){
    console.log(a)
}
print(fn) //100


//闭包:自由变量的查找,是在函数定义的地方,向上级作用域查找,不是在执行的地方.


//闭包的应用

//1. 隐藏数据,创建私有变量,提供api
function createCache(){
    const data = {};
    return{
        set:function(key,val){
            data[key] = val
        },
        get:function(key){
            return data[key]
        }
    }
}
const c = createCache()
c.set('a',100)
c.get('a')
//data.a 是取不到值的,因为自由变量,是在函数定义的时候,向上级作用域查找


//2. 在循环中使用,绑定事件,要注意作用域
let i,a;
for ( i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.addEventListener('click',function(){
        e.preventDefault()
        console.log(i);
    })
    document.body.appendChild(a)
}


