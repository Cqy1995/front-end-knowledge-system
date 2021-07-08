function easyajax(url){
    const p = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('get',url,true)
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
                if (xhr.status === 404) {  
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
    return p
}