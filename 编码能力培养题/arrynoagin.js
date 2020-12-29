// Const  a= [1,2,3]; b=[2,3,4];找不同输出[1,4];
function findnoagin(a,b){
    let a1 = a.filter(item=> b.indexof(item) == -1);
    let  b1 =b.filter(item=> a.indexof(item) == -1);
    return a1.concat(b1);
}