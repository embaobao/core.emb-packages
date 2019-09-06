const TimeExtend = {

    _extend(key) {
        try {
            if (key) return this[key];
        } catch (error) {
            console.error("没有:" + key + "扩展 ！ 错误详情：" + error)
        }
        return this;
    },

    /**万能时间格式化函数 |emb|朱盟
     *toString() 表达式解析 “ Y-M-D”="2019-6-8" "h-m-s"="小时 分钟 秒 " 
     * GetTime() 设置时间 传入对象 {y:2019,...}
     * @returns 返回对象，包括时间各个形式，及toString 表达式格式化！
     * console.log(GetTime());
     * console.log(GetTime().toString("y-M-d h:m:s:i", true)); //现在时间
     * console.log(GetTime({y:2017,m:3}).toString("y-M-d h:m:s:i", true));//设置的时间
     */
    getTime(dateObj) {
        var time = new Date();
        var time_Symbol = 0;
        if (dateObj) {
            "y" in dateObj ? time.setFullYear(dateObj.y) : "";
            "m" in dateObj ? time.setMonth(dateObj.m - 1) : "";
            "d" in dateObj ? time.setDate(dateObj.d) : "";
            "w" in dateObj ? time.setDay(dateObj.w) : "";
            "h" in dateObj ? time.setHours(dateObj.h) : "";
            "mm" in dateObj ? time.setMinutes(dateObj.mm) : "";
            "s" in dateObj ? time.setSeconds(dateObj.s) : "";
            "i" in dateObj ? time.setMilliseconds(dateObj.i) : "";
        }

        var
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            day = time.getDate(),
            week = time.getDay(),
            hour = time.getHours(),
            minutes = time.getMinutes(),
            seconds = time.getSeconds(),
            msecond = time.getMilliseconds();
        time_Symbol = time.getTime();

        function expressParse(express, isPad) {
            switch (express) {
                case "Y":
                    return year
                case "y":
                    return year
                case "M":
                    return isPad ? (month < 10 ? "0" + month : month) : month
                case "D":
                    return isPad ? (day < 10 ? "0" + day : day) : day
                case "d":
                    return isPad ? (day < 10 ? "0" + day : day) : day
                case "h":
                    return isPad ? (hour < 10 ? "0" + hour : hour) : hour
                case "H":
                    return isPad ? (hour < 10 ? "0" + hour : hour) : hour
                case "m":
                    return isPad ? (minutes < 10 ? "0" + minutes : minutes) : minutes
                case "s":
                    return isPad ? (seconds < 10 ? "0" + seconds : seconds) : seconds
                case "S":
                    return isPad ? (seconds < 10 ? "0" + seconds : seconds) : seconds
                case "i":
                    var i = msecond;
                    if (i < 10) {
                        i = "00" + i;
                    } else if (i < 99 && i >= 10) {
                        i = "0" + i;
                    }
                    return isPad ? i : msecond
                case "w":
                    return isPad ? (week < 10 ? "0" + week : week) : week
                case "W":
                    return isPad ? (week < 10 ? "0" + week : week) : week
                default:
                    return express;
            }
        }
        return {
            y: year,
            m: month,
            d: day,
            h: hour,
            mm: minutes,
            s: seconds,
            ms: msecond,
            w: week,
            timeSymbol: time_Symbol,
            timeArrayYMD: [year, month, day],
            timeArrayHMS: [hour, minutes, seconds],
            timeExpressParse: expressParse,
            /**
             * emb|目的，希望能格式化字符串
             *时间字符串格式化
             *
             * @param {*} express
             */
            toString: function (express, isPad) {
                var expressArrays = express.split("");
                var strFormat = "";
                for (const i in expressArrays) {
                    strFormat += expressParse(expressArrays[i], isPad);
                }
                return strFormat;
            }
        }
    },
    /**计时器 EMB|吃火星的宝宝|朱盟
     * @static
     * @param {*执行函数} handler(count（当前句柄的执行次数）,Interval（当前句柄的执行间隔）) 
     * @param {*执行次数} count  空值默认执行1次
     * @param [可选 执行间隔 (毫秒)] Interval
     * @param [可选] function 计时结束执行器 ,暂未实现
     * @param [可选] o 计时执行对象 ,暂未实现
     * @returns 返回当前的计时器对象 
     * @memberof ObjectExtend
     * DEMO
     * * Timer(handler, 1); //执行一次
     * Timer(handler, 1, 100); //执行一次 间隔100
     * Timer(handler, -1, 100); //无限次执行
     */
    Timer(handler, count, o) {
        var time_count = count;
        var time_Interval = 1000;
        // console.log(count);
        count ? "" : time_count = 1;
        arguments.length > 2 && arguments[2] > 0 ? time_Interval = arguments[2] : time_Interval = 1000;
        // console.log(arguments);
        var timer_id = setInterval(function () {
            if (time_count === 0) {
                clearInterval(timer_id);
                timer_id = null;
            } else {
                handler(time_count, time_Interval, o);
                time_count--;
            }

        }, time_Interval);
        return timer_id;
    }



}


module.exports = TimeExtend