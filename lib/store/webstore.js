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
    }

}


module.exports = LocaldbExtend;