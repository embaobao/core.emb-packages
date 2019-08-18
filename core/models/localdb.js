const LocaldbExtend = {
    _extend(key) {
        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    },
    localdb(key, val) {
        //  空 返回对象
        if (!key) {
            return this;
        }
        //  $ 开启 缓存模式
        else if (key === "$") {
            if (val) {
                //设置并操作
                return this.setCach = this.setCach(val);
            } else {
                //查看缓存
                return this.cach();
            }
        } else if (key instanceof Function) {
            //Function 开启 获取缓存模式 如果不操作
            return this.cach(key);
            //  @ 开启 用户存储模式
        } else if (key === "@") {
            if (val) return this.user(val);
            return this.user();
        } else {
            return this.db(key, val);
        }
    },
    db(key, val) {
        let v = localStorage.getItem(key);
        v ? "" : localStorage.setItem(key, "[]");
        try {
            v = JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.log("LocalDBEngine.db try  JSON.parse is fail.")
        }

        if (arguments.length === 1) {
            return v;
        } else {
            if (val instanceof Array) {
                localStorage.setItem(key, JSON.stringify(val));
            } else if (val && typeof val === "object") {
                v.push(val)
                v = JSON.stringify(v);
                localStorage.setItem(key, v);
                return {
                    key: v
                };
            }
        }
    },
    cach(fn) {
        let cachs = this.db("__cach__");
        if (cachs && cachs instanceof Array) {
            fn ? cachs.forEach(fn) : "";
        } else {
            return false;
        }
        return this.cachs = cachs;
    },
    setCach(data) {
        return this.cachs = this.db("__cach__", data);
    },
    user(user) {
        if (user) {
            return this.users = this.db("__user", [user]);
        }
        user = ((user = this.db("__user")[0]) ? user : false);
        return this.users = user;
    },
    /**
     *Cookie 兼容版本
     * @param {键*string} key
     * @param {值*string} value
     * @param {Set Cookie [ expires path domain secure ]* Object} options
     * @returns
     */
    Cookie(key, value, options) {
        // Write  
        var d, cookies, cookie, index;
        if (arguments.length > 1) {
            typeof options === "object" ? "" : options = {};
            return document.cookie = [
                key + "=" + value,
                options.expires ? "; expires=" +
                ((d = new Date())
                    .setDate(
                        d.getDate() + (isNaN(Number(options.expires)) ? 0 : options.expires)
                    ) && d) :
                "",
                options.path ? "; path=" + options.path : "",
                options.domain ? "; domain=" + options.domain : "",
                options.secure ? "; secure" : ""
            ].join("");
        }
        //Read
        for (cookies = document.cookie.split(" ;"), index = 0; cookies[index]; index++) {
            cookie = cookies[index].split("=");
            if (cookie[0] === key) return cookie[1];
        }
    },
    removeCookie(key, path) {
        return this.Cookie(key, "", {
            path: (path ? path : ""),
            expires: -1
        })


    }



}


module.exports = LocaldbExtend;