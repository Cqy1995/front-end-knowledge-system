const debounce = (func, time = 3000) => {
    let timer = null;
    return (...args) => {
        if (timer) {
            timer.clear()
        }
        timer = setTimeout(() => {
            func(args);
            timer = null
        }, time)
    }
}
