const arr = [1,2,3,4,5,3,4];
for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          arr.splice(i,null)
        }
    }
}
console.log(arr)
