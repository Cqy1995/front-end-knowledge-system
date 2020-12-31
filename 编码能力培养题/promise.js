const PENDING = Symbol();
const REJECT = Symbol();
const FULLFILLED = Symbol();

const MyPromise = function(){
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