try {
    console.log(1);
    setTimeout(() => {
        console.log(2);
    }, 100);
    setTimeout(() => {
        console.log(3);
        throw new Error(5)
    });
    console.log(4);
} catch (error) {
    console.log(error);
}

1,4,3,5,2


