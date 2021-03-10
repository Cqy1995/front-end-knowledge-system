// 冒泡排序
function bubblesort(array){
    for (let index = 0; index < array.length; index++) {
        const itemi = array[index];
        for (let j = 0; j < array.length-1-index; j++) {
            const itemj = array[j];
            if (itemj > array[j+1]) {
                const temp = itemj;
                itemj = array[j+1]
                array[j+1] = temp
            }
        }
    }
}