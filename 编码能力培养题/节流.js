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