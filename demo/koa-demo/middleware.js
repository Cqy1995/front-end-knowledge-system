const koa = require('koa')
const app = new koa();

const middleware = function async (ctx,next){
    console.log('moddle ware ',ctx.request.path);
    // next()
}
const middleware1 = function async (ctx,next){
    console.log('moddle ware 1111',ctx.request.path);
    next()
}
const middleware2 = function async (ctx,next){
    console.log('moddle ware 2222',ctx.request.path);
    next()
}
app.use(middleware1)

app.use(middleware2)

app.use(middleware)

//安装use安装顺序调用
//没有next（）会中断。如果有next（），会进入下一个中间件中。


app.listen(3001)