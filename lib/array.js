// Array Extend Method Collector
const ArrayExtend = {
    _extend(key) {
        /****Array max Val */
        Array.prototype.max = function (option) {

            let val = Math.max.apply(false, this);
            if (option && option !== "index") {
                return val;
            } else if (option && option === "index") {
                return this.indexOf(val);
            }
            return {
                value: val,
                index: this.indexOf(val)
            }
        }

        /****Array min Val*/
        Array.prototype.min = function (option) {
            let val = Math.min.apply(false, this);
            if (option && option !== "index") {
                return val;
            } else if (option && option === "index") {
                return this.indexOf(val);
            }
            return {
                value: val,
                index: this.indexOf(val)
            }
        }

        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    },
    /**
     * @param {遍历*Array} arry 
     * @param {对象属性*string} key 
     * @param {属性值*} val 
     */
    fromArrayDelete(arry, key, val) {
        for (var i = 0, item; item = arry[i++];) {
            if (item[key] === val) {
                return arry.splice(i - 1, 1);
            }
        }
    }

}


module.exports = ArrayExtend;