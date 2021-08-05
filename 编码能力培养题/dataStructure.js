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

/**
 * 集合的基本应用
 * Set方法的使用
*/
//去重
const arr = [1,1,2,3];
const arr2 = [...new Set(arr)];
//判断元素是否在集合中
const set = new Set(arr);
const has = set.has(1);
//求交集
const set2 = new Set([2,3,4]);
const set3 = new Set([...set].filter(item => set2.has(item)));
set使用
let mySet = new Set();
mySet.add(1)
mySet.add(5)
mySet.add(5)
mySet.add('woshi5')
mySet.add({a:1,b:2})

const has = mySet.has(1)
const hasstr = mySet.has('wo')

mySet.delete(5)

console.log(mySet);
//迭代set
for (const iterator of mySet) {
    console.log(iterator);
}
for (const iterator of mySet.keys()) {
    console.log(iterator);
}
for (const iterator of mySet.values()) {
    console.log(iterator);
}
for (const iterator of mySet.entries()) {
    console.log(iterator);
}
//与数组相互转换
const myarr = Array.from(mySet);
const mySet2 = new Set([1,2,3,3,4]);
//交集
const intersection = new Set([...mySet].filter(x => mySet2.has(x)));
//差集
const difference = new Set([...mySet].filter(x => !mySet2.has(x)));


/**
 * 字典 es6-Map
 * 
*/
const m = new Map();
//增
m.set('a','aa');
m.set('b','bb');
//删
m.delete('b');
// m.clear();清空所有键值对
//改
m.set('a','aaba')
