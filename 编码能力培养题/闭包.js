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
// 更详细解释：
// 闭包是由函数以及声明该函数的词法环境组合而成的。
// 这个环境包含了闭包创建时所能访问的所有局部变量。


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

//3. 闭包实现计数器
function createCounter() {
    let count = 0;
    return {
        increment: function () {
            count++;
            return count;
        },
        decrement: function () {
            count--;
            return count;
        },
        getCount: function () {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1

//4. 使用闭包模拟私有方法
const calculator = (function () {
    // 私有变量和方法
    let result = 0;

    function checkNumber(x) {
        if (typeof x !== 'number') {
            throw new Error('参数必须是数字');
        }
    }

    // 公有方法，可以访问私有变量和方法
    return {
        add: function (x) {
            checkNumber(x);
            result += x;
            return this;
        },
        multiply: function (x) {
            checkNumber(x);
            result *= x;
            return this;
        },
        getResult: function () {
            return result;
        }
    };
})();

// 修正循环中的闭包问题
// 解决方案1: 使用立即执行函数表达式(IIFE)
for (var i = 0; i < 5; i++) {
    (function (j) {
        setTimeout(function () {
            console.log('IIFE方式:', j);
        }, 1000);
    })(i);
}

// 解决方案2: 使用let代替var
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log('let方式:', i);
    }, 1000);
}

// 闭包的内存管理示例
function potentialMemoryLeak() {
    let largeArray = new Array(1000000).fill('memory leak example');

    return function () {
        // 只使用了largeArray的长度属性
        console.log(largeArray.length);
    };
}

// 使用闭包后，即使不再需要整个数组，也会被保留在内存中
let leakCheck = potentialMemoryLeak();
leakCheck(); // 输出1000000

// 为了避免内存泄漏，可以在不需要时解除引用
leakCheck = null; // 允许垃圾回收


