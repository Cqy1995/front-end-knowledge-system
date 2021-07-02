function mybind(bindthis, ...args) {
    return (...newargs) => {
        this.apply(bindthis, [...args, ...newargs])
    }
}

Function.prototype.mybind = function (content = window, ...args) {
    content.fn = this;
    return (...newargs) => {
        content.fn([...args, ...newargs])
        delete content.fn
    }
}

Function.prototype.symbolbind = function (content = window, ...args) {
    const symbolfn = new Symbol('fn')
    content[symbolfn] = this;
    return (...newargs) => {
        content[symbolfn]([...args, ...newargs])
        delete content[symbolfn]
    }
}


Function.prototype.bind1 = function () {
    const args = Array.prototype.slice.call(arguments);
    const t = args.shift()
    const self = this
    return function(){
        return self.apply(t,args)
    }
}