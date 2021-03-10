const quicksort = function(arr = []){
    if (arr.length <= 1) {
        return arr
    }
    const pivotindex = Math.floor(arr.length / 2)
    const pivot = arr.splice(pivotindex,1)[0];
    let leftarr = [],rightarr = [];
    for (let index = 0; index < arr.length; index++) {
        const element = array[index];
        if (element < pivot) {
            leftarr.push(element)
        }else{
            rightarr.push(element)
        }
    }
    return quicksort(leftarr).concat([pivot],quicksort(rightarr))
}