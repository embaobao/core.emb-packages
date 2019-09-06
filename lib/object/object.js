const ObjectExtend = {
    _extend(key) {

        Object.prototype.forEach = function (fn) {
            let keys = Object.keys(this);
            keys.forEach(key => {
                fn(this[key], key);
            });
        };
        /***复制对象中的属性和值及覆盖到目标类 覆盖
         * @function extend
         */
        Object._extend = function (o, object) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    o[key] = object[key];
                }
                return o;
            }
        }

        // 如果目标对象有相同名字的属性，不进行覆盖
        Object._merge = function (o, p) {
            for (const key in p) {
                if (object.hasOwnProperty(key)) {
                    if (o.hasOwnProperty[key]) continue;
                    o[key] = object[key];
                }
            }
            return o;
        }


        //目标对象存在和选择对象不同的属性，删除之  像接口
        Object._restrict = function (o, p) {
            for (const key in o) {
                if (key in p) {
                    delete o[key];
                }
            }
            return o;
        }

        // 如果o中存在P的属性，删除之
        Object._substract = function (o, p) {
            for (const key in p) {
                delete o[key];
            }
        }

        //返回新的对象 这个对象同时拥有参数对象中的属性 同名会覆盖 ；
        Object._union = function () {
            var o = {};
            for (const key in arguments) {
                Object._extend(o, arguments[key]);
            }
            return o;
        }

        // 对象属性 求交集
        Object._intersection = function () {
            var o = arguments[0];
            for (const key in arguments) {
                if (key == arguments.length) continue;
                o = Object._restrict(o, arguments[key + 1]);
            }
            return o;
        }
        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    }



}

module.exports = ObjectExtend;