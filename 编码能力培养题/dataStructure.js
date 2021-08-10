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

/**
 * 树
*/
const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'e',
                    children: []
                },
                {
                    val: 'f',
                    children: []
                }
            ]
        },
        {
            val: 'c',
            children: [
                {
                    val: 'g',
                    children: []
                },
                {
                    val: 'h',
                    children: []
                }
            ]
        }
    ]
};
//深度优先遍历
const dfs = (root)=>{
    console.log(root.val);
    root.children.forEach(dfs);
}
dfs(tree)
//广度优先遍历
const bfs = (root) => {
    const q = [root];
    while (q.length) {
        const n = q.shift();
        console.log(n.val);
        n.children.forEach(element => {
            q.push(element)
        });
    }
}
bfs(tree)

/**
 * 二叉树
*/
const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}
//递归版
//先序遍历
const preorder = (root) => {
    if (!root) {
        return
    }
    console.log(root.val);
    preorder(root.left);
    preorder(root.right)
}
preorder(bt)
//中序遍历
const inorder = (root) => {
    if (!root) {
        return
    }
    inorder(root.left);
    console.log(root.val);
    inorder(root.right)
}
inorder(bt)
//后序遍历
const postorder = (root) => {
    if (!root) {
        return
    }
    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}
postorder(bt)

// 非递归版
/**
 * 先序遍历
 * 思路:
 * 创建一个栈,默认是当前节点
 * 弹窗栈顶,输出
 * 并把右子树和左子树推入栈中
 * 注意:先序遍历输出是左中右,所以右子树先入栈
 * 进而根据栈是否为空就可以循环了
*/
const preorderFdg = (root) => {
    if (!root) { return }
    const stack = [root];
    while (stack.length > 0) {
        const n = stack.pop();
        console.log(n.val);
        if (n.right) {
            stack.push(n.right)
        }
        if (n.left) {
            stack.push(n.left)
        }
    }
}
preorderFdg(bt)
/**
 * 中序遍历
 * 创建一个栈,和一个指针,指针初始化为根节点
 * 有指针的时候就把指针左节点先推到栈中
 * 然后执行根节点
 * 所有左节点都推完后,把右节点推到栈中,
 * 直到栈清空为止
 * */ 
const inorderFdg = (root) => {
    if (!root) {
        return
    }
    const stack = [];
    let p = root;
    while (stack.length || p) {
        while (p) {
            stack.push(p)
            p = p.left
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right
    }
}
inorderFdg(bt)
/**
 * 后序遍历
 * 思路和先序遍历一样
 * 只不过在执行的时候,把所有推到一个新栈中,
 * 然后新栈反向输出
 * */
const postorderFdg = (root) => {
    if (!root) {
        return
    }
    const  stack = [root];
    const outputstack = [];
    while(stack.length){
        const n = stack.pop();
        outputstack.push(n)
        if (n.left) {
            stack.push(n.left)
        }
        if (n.right) {
            stack.push(n.right)
        }
    }
    while(outputstack.length){
        const n = outputstack.pop()
        console.log(n.val);
    }
}
postorderFdg(bt)


/**
 * 图
*/
const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3]
}
// 深度优先遍历
const visited = new Set();
const dfs = (n) =>{
    console.log(n);
    visited.add(n)
    graph[n].forEach(c => {
        if (!visited.has(c)) {
            dfs(c)
        }
    });
}
dfs(2)

//广度优先遍历
const visited = new Set();
visited.add(2);
const stack = [2];
while (stack.length) {
    const q = stack.shift();
    console.log(q);
    graph[q].forEach(c => {
        if (!visited.has(c)) {
            stack.push(c)
            visited.add(c)
        }
    });
}


