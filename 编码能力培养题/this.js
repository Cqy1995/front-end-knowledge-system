const { error } = require("console")

//针对this指向题目
function fn(){this.name} 
var obj = {name:'obj',fn:fn}
var f2 = obj.fn
// 求下面this指向
fn()
obj.fn()
f2()

/**
 * 1，3严格模式下指向undefined
 * 2指向obj
 */

 