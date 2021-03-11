const { error } = require("console");

Array.prototype.mymap = function(fn,context){
    let resarr = [];
    const ctx = context ? context : this;
    if (typeof fn !== 'function') {
        throw new error(`${fn} is not a function`)
    }
    this.forEach((item,index)=>{
        resarr.push(fn.call(ctx,item,index,this))
    })
    return resarr
}