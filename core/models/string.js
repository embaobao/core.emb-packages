const StringExtend = {
    _extend(key) {
        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    },

    /**数字字符串补齐函数
     * @param {* 数字字符串} number
     * @param {* 补齐的位数} o
     * @returns 返回补齐结果 
     */
    padInt(number, o) {
        o = o > 0 ? o : 1;
        var z = "0";
        number = parseInt(number).toString(10);
        z = arguments.length > 2 ? arguments[2] : "0";
        for (var i = 1; i <= o; i++) {
            if (number < Math.pow(10, i - 1)) { //如果
                number = z + "" + number;
            }
        }
        console.log(number);
        return number;
    },
    /**随机字符生成器 // console.log(randomChars("\A-aa-0000"));
     * 格式化生成验证码 A 代表大写字母 随机生成数字， 并转化层所对应Ascll 码对应的随机字母， 根据字母和数字的范围来生成
     * 合并了randomNumber 方法
     * @param {表达式* A 大写字母 a 小写字母 0 数字}  express:"A-A"= return "Q-F"
     * @param {max 最大值 ，此参数填写时 此函数变成随机数字生成器 第一个参数为最小值* Number} max
     * @returns 随机生成格式化的字符串
     */
    getRandomChars(express, max) {
        var str = "";
        if (arguments.length > 1) {
            return randomNumber(express, max);
        }

        function randomNumber(min, max) {
            return min + Math.round(Math.random() * (max - min));
        }

        function randomChar(o) {
            // 单字符生成
            switch (o) {
                case "a":
                    return String.fromCharCode(randomNumber(97, 122));
                    break;
                case "A":
                    return String.fromCharCode(randomNumber(65, 90));
                    break;
                    break;
                case "0":
                    return String.fromCharCode(randomNumber(48, 57));
                    break;

                default:
                    return o;
                    break;
            }
        }

        for (const key in express) {
            if (express[key - 1] === "\\") {
                str += express[key];
            } else if (express[key] !== "\\") {
                str += randomChar(express[key]);
            }
        }
        return str;
    }

}
module.exports = StringExtend;
// export default new StringExtend