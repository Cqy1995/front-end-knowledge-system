function deepclone(obj) {
    if (obj && typeof obj == 'object') {
        let cloneobj = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
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