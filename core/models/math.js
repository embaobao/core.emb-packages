const MathExtend = {
    _extend(key) {
       try {
           if (key) return this[key];
       } catch (error) {
           console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
       }
       return this;
    }

    ,
    /**随机数的生成
     * @param {最小范围*} min
     * @param {*最大范围} max
     * @returns
     */
    getRandomNumber(min, max) {
        if (arguments.length === 1) {
            max = min;
            min = 0;
        }
        return min + Math.round(Math.random() * (max - min));
    }




}


module.exports = MathExtend;