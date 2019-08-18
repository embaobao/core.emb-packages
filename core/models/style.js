const StyleExtend = {


    _extend(key) {

        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    },

    // sys style color  
    /** get random a color of rgb
     * @returns rgba string
     */
    getRgbRandom() {
        return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
    },
    /** get random a color of rgba 
     * @returns rgb string
     */
    getRgbaRandom() {
        return "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.random().toFixed(2) + ")";
    },
    // 去抖 debounce
    debounce(cb, delay = 100) {
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                cb();
                timer = null;
            }, delay);
        }
    },
    // 节流 throttle
    throttle(cb, delay = 100) {
        let timer = null;
        return function () {
            if (!timer) return false;
            timer = setTimeout(function () {
                cb();
                timer = null;
            }, delay);
        }
    }


}
module.exports = StyleExtend;