const debounce = (func, time = 500) => {
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


function debounce(fn, delay = 500) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.applay(this, arguments)
            timer = null
        }, delay)
    }
}

inputbox.addEventListener('keyup', debounce(function() {

}, 600))