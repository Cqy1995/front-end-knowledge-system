/** 
 *let 仅作用域代码块的变量，用闭包的形式定义一个不被污染的变量
 *不存在变量提升
 *不允许重复声明
 */
(function(){
    var a = 1;
    console.log(a);
})()
/**
 * const 声明一个常量
 * 变量不提升
 * 不能重复声明
 * 不能预处理
 * 不能被修改
 */
function _const(key,val){
    window[key] = val;
    Object.defineProperty(window,key,{
        enumerable:false,
        configurable:false,
        get:function(){
            return value;
        },
        set:function(newvalue){
            if (newvalue !== value) {
                throw TypeError("这是只读属性，不能修改！")
            }else{
                return value;
            }
        }
    })
}