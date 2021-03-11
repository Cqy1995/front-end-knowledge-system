// 字符串去重的方法
var str ='absabskkddwdd'
// 第一种方法
Array.from(new Set([...str])).join('');
// 第二种方法
[].filter.call(str,(s,i,o)=>o.indexOf(s)==i).join('');

//拉平数组
const arr = [
	{
		id: 1,
		children: [
            {
                id: 2,
                children: [
                    {
                        id: 3,
                        children: []
                    }
                ]
            },
            {
				id: 6, 
				children: []
			}
        ]
	},
    {
		id: 4, 
		children: [
            {
                id: 5,
                children: []
            }
        ]
	}
];

// 方法
function flattenDeep(arr){
   return [].concat(...arr.map(item =>[].concat(item, ...flattenDeep(item.children))));
}
flattenDeep(arr)

const arr2 = [1,2,3,[4],[5,[6,[7]]]];
// 方法一
arr2.flat(finity)
// 方法二
let newarr = []
function arrRedun(arr){
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (Array.isArray(element)) {
            arrRedun(element)
        }else{
            newarr.push(element)
        }
    }
}
arrRedun(arr2)
//方法三
const flatten1 = arr1 => arr1.reduce((acc,val) => acc.concat(Array.isArray(val)? flatten1(val):val),[],)
//方法四
function arrRedun(arr){
    let wantarr = arr.join().split(',')
    //join是吧多维数组转成字符串，使用split转成数组，但这个时候数组里面的每一项是字符串
    //所有使用for-of 循环数组的每一项，把每一项改变成数字
    let _arr = [];
    for (const iterator of wantarr) {
        _arr.push(+iterator)
    }
    return _arr
}

