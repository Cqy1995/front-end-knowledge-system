// 实现深拷贝
function deepclone(obj) {
    if (obj && typeof obj == 'object') {
        let cloneobj = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {//key是否是对象上的属性，而非原型链的属性
                const element = obj[key];
                if (element && typeof element == "object") {
                    cloneobj[key] = deepclone(element);
                } else {
                    cloneobj[key] = element;
                }
            }
        }
    } else {
        return obj
    }
}

function deepclone(obj){
    if(!obj && typeof obj !=='object' ) return obj;
    let cloneobj = Array.isArray(obj) ? [] :{};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (element && typeof element == 'object') {
                cloneobj[key] =  deepclone(element)
            }else{
                cloneobj[key] = element
            }
        }
    }
    return cloneobj
}

let newTree = deepclone(tree)

//面试题变一维数组，回头要确认一下代码的正确性
function getonearr (newTree){
let oneArr = [];
for (let index = 0; index < newTree.length; index++) {
    const element = newTree[index];
    if (element.children) {
        oneArr.push({
            id:element.id,
            name:element.name
        })
        getonearr(element.children)
    }else{
        oneArr.push(element)
    }
}
return [...oneArr]
}




function deepclone(obj){
    if (obj && typeof obj == 'object') {
        let newobj = Array.isArray(obj) ? [] :{};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                 
                
                
            }
        }
    }
}