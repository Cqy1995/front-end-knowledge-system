const PENDING = Symbol();
const REJECT = Symbol();
const FULLFILLED = Symbol();

const MyPromise = function(fn){
    this.state = PENDING;
    this.value = '';
    const resolve = (val)=>{
        this.state = FULLFILLED;
        this.value=val;
    }
    const rejcect = (err)=>{
        this.state = REJECT;
        this.value = err;
    }
    this.then = (onfullfilled,onreject)=>{
        if (this.state == FULLFILLED) {
            onfullfilled(this.value)
        }else{
            onreject(this.value)
        }
    }
    try {
        fn(resolve,rejcect)
    } catch (error) {
        rejcect(err)
    }
}

let arr = [13,25,12,27,31,119];
// 方法一
arr.sort();
arr.sort((a,b)=> a-b)
// 方法二,冒泡
for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    for (let j = 0; j < arr.length; j++) {
        const jitem = array[j+1];
        if (item > jitem) {
           let pre = arr[j];
            arr[j] =arr[j+1];
            arr[j+1] = pre
        }
    }
}



Promise.resolve().then(()=>{
    console.log(1);
}).catch(()=>{
    console.log(2);
}).then(()=>{
    console.log(3);
})

Promise.resolve().then(()=>{
    console.log(1);
    throw new Error('error1')
}).catch(()=>{
    console.log(2);
}).then(()=>{
    console.log(3);
})

Promise.resolve().then(()=>{
    console.log(1);
    throw new Error('error1')
}).catch(()=>{
    console.log(2);
}).catch(()=>{
    console.log(3);
})

