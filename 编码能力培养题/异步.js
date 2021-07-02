Promise.resolve().then(()=>{
    console.log(1);
}).catch(()=>{
    console.log(2);
}).then(()=>{
    console.log(3);
})
// 1,3
Promise.resolve().then(()=>{
    console.log(1);
    throw new Error('errol')
}).catch(()=>{
    console.log(2);
}).then(()=>{
    console.log(3);
})
//1,2,3
Promise.resolve().then(()=>{
    console.log(1);
    throw new Error('errol')
}).catch(()=>{
    console.log(2);
}).catch(()=>{
    console.log(3);
})
//1,2

async function fn(){
    return 100
}
(async function(){
    const a = fn()
    const b = await fn()
    console.log(a,b);//Promise{fulfilled:100} , 100
})()

(async function(){
    console.log('start');
    const a = await 100;
    console.log('a',a);//Promise{fulfilled:100}
    const b = await Promise.resolve(200)
    console.log('b',b);//200
    const c = await Promise.reject(300)
    console.log('c',c);
    console.log('end');
})()
/*
start
a 100
b 200
Promise {<rejected>: 300}
VM85:10 Uncaught (in promise) 300
*/

(function(){
    async function async1(){
        console.log('async1 start');
        await async2()
        console.log('async1 end');
    }
    async function async2(){
        console.log('async2 start');
    }
    console.log('script start');
    setTimeout(async function(){
        console.log('setTimeout1 start');
        await async2()
        console.log('setTimeout2 end');
    },100)
    async1()
    new Promise(function(resolve){
        console.log('promise1');
        resolve()
    }).then(function(){
        console.log('promise2');
    })
    setTimeout(function(){
        console.log('setTimeout2');
    },50)
    console.log('script end');
})()

/**
 * script start
 * async1 start
 * async2 start
 * promise1
 * script end
 * async1 end
 * promise2
 * setTimeout
*/


