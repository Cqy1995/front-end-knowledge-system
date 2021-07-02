class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector);
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            this[i] = element;
        }
        this.length = result.length
        this.selector = selector
    }
    get(index) {
        return this[inxdex]
    }
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]
            fn(element)
        }
    }
    on(type,fn){
        return this.each(elem=>{
            elem.addEventListener(type,fn,false)
        })
    }
}

const $p = new jQuery('p')
$p.get(1)
$p.each((elem)=>console.log(elem.nodeName))

//插件机制(根据原型链)
jQuery.prototype.dialog = function(info){
    console.log(info);
}
//复写机制,'造轮子'
class myJquery extends jQuery{
    constructor(selector){
        super(selector)
    }
    //扩展自己的新方法
}
