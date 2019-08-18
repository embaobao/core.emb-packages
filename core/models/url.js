const Url = {
    _extend(key) {
        try {
            if (key) return this.extend()[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }

        return this;
    },
    // 设置/获取当前路径 hash  
    HASH(value) {
        let res = (value ? (window.location.hash = value) : (window.location.hash.replace(/\#/g, "")));
        res = res ? res : "";
        return res;
    },
    // 设置/获取当前路径 url  
    PATH(path) {
        return path ? (window.location.pathname = path) : window.location.pathname;
    }
}


module.exports = Url