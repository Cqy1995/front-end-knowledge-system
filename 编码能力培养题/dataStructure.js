/*
* 栈
*/
const stack = [];
stack.push(1);
stack.push(2);
const item1 = stack.pop();
const item2 = stack.pop();
// leedcode 20 有效括号
var isValid = function (s) {
    if(s.length%2 === 1){return false}
    const stake = [];
    for (let i = 0; i < s.length; i+=1) {
        const c = s[i];
        if (c === '(' || c === '{' || c === '[') {
            stake.push(t)
        } else {
            const t = stake[stake.length - 1];
            if (
                (t === '(' && c === ')') ||
                (t === '{' && c === '}') ||
                (t === '[' && c === ']')
            ){
                stake.pop()
            }else{
                return false
            }
        }
    }
    return stake.length === 0;
};
isValid('()')
//函数调用堆栈
const func1 = ()=>{
     func2()
    }
const func2 = ()=>{ func3()}
const func3 = ()=>{ }
func1()


/*
*   队列
*/
const queue = [];
queue.push(1);//入队
queue.push(2);
const it1 = queue.shift();//出队
const it2 = queue.shift();


/**
 * 链表
*/
const a = {val:'a'};
const b = {val:'b'};
const c = {val:'c'};
const d = {val:'d'};
a.next = b;
b.next = c;
c.next = d;

//遍历列表
let p = a;
while(p){
    console.log(p.val);
    p = p.next
}
//插入
const e = {val:'e'}
c.next = e;
e.next = d;
//删除
c.next = d;

//遍历链表在工作中可以处理json
//根据path路径,可以求到对应的值
const json ={
    a:{b:{c:1}},
    d:{e:2}
}
const path = ['d','e'];
let p = json;
path.forEach((k)=>{
    p = p[k]
})