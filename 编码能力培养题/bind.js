function mybind(bindthis,...args){
    return (...newargs) =>{
        this.apply(bindthis,[...args,...newargs])
    }
}