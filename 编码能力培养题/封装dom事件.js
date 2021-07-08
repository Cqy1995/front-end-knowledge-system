function DomEvent(elem, type, selecter, fn) {
    if (fn == null) {
        fn = selecter;
        selecter = null;
    }
    elem.addEventListener(type, event => {
        const target = event.target;
        if (selecter) {
            if (target.matches(selecter)) {
                fn.call(target,event)
            }
        } else {
            fn.call(target,event)
        }
    })

}
