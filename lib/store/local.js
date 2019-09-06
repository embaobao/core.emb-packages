class LocalStorage {
    constructor (parameter){

    }
    get(key) {
        localStorage.getItem(key)
    }
    set(key, val) {
        localStorage.getItem(key,val)
    }
    remove(key){
        localStorage.removeItem()
    }
    clear(){
        localStorage.clear()
    }
}



function store (parameter) {
    new LocalStorage(parameter)
}












