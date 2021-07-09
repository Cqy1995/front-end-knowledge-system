// 实现节流函数
const throtlle = (fn, time = 300) => {
    let timecha = 0;
    return (...args) => {
        let nowdate = new Date().getTime();
        if (nowdate - timecha > time) {
            fn(args)
            timecha = nowdate
        }
    }
}

// 时间复杂度随着数据规模增大而增大


function throtlle1(fn,delay=100){
    let timer = null;
    return function(){
        if (timer) {
           return
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
            timer = null
        },delay)
    }
}