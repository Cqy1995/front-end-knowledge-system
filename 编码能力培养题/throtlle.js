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
