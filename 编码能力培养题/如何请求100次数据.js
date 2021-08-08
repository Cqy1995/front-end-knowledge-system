// 有100个请求，每次执行5个，每执行5个把结果放在对象中，直到请求完成
function count(start,end){
    console.log(start);
    let timer = setInterval(function(){
        if (start < end) {
            console.log(start+=1);
        }
    },100)
    return {
        cancel:function(){
            clearInterval(timer)
        }
    }
}


