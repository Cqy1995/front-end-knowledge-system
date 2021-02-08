function myisArray(_array){
    if (typeof Array.isArray === 'function') {
        return Array.isArray(_array)
    }else{
        return Object.prototype.toString.call(_array) == '[object Array]'
    }
}