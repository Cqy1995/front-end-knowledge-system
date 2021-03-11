function mybind(bindthis, ...args) {
    return (...newargs) => {
        this.apply(bindthis, [...args, ...newargs])
    }
}

Function.prototype.mybind = function (content = window, ...args) {
    content.fn = this;
    return funciton(...newargs) {
        content.fn([...args, ...newargs])
        delete content.fn
    }
}

Function.prototype.symbolbind = funciton(content = window, ...args) {
    const symbolfn = new Symbol('fn')
    content[symbolfn] = this;
    return (...newargs) => {
        content[symbolfn]([...args, ...newargs])
        delete content[symbolfn]
    }
}