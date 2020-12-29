
function timeout(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('点亮', name);
            resolve()
        }, time)
    })
}

async function hld() {
    while (true) {
        await timeout('红灯', 3000)
        await timeout('绿灯', 5000)
        await timeout('黄灯', 1000)
    }
}
hld() 