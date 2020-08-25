/*
 * @Author: zhumeng@sensorsdata.cn
 * @Descripttion:
 * @Date: 2020-08-25 09:29:31
 * @LastEditTime: 2020-08-25 10:26:29
 */

/**
 * @name: getType
 * @desc: 获取当前数据类型
 * @param {any} 数据
 * @return {string} undefined null Object function arrary
 */
export const getType = (v) =>
  v === undefined
    ? 'undefined'
    : v === null
    ? 'null'
    : v.constructor.name.toLowerCase();

export const isEmpty = (val) =>
  val == null || !(Object.keys(val) || val).length;

// 设置/获取当前路径 hash
export const HASH = (value) => {
  let res = value
    ? (window.location.hash = value)
    : window.location.hash.replace(/\#/g, '');
  res = res ? res : '';
  return res;
};

// 设置/获取当前路径 url
export const PATH = (path) => {
  return path ? (window.location.pathname = path) : window.location.pathname;
};

/**万能时间格式化函数 |emb|朱盟
 *toString() 表达式解析 “ Y-M-D”="2019-6-8" "h-m-s"="小时 分钟 秒 "
 * GetTime() 设置时间 传入对象 {y:2019,...}
 * @returns 返回对象，包括时间各个形式，及toString 表达式格式化！
 * console.log(GetTime());
 * console.log(GetTime().toString("y-M-d h:m:s:i", true)); //现在时间
 * console.log(GetTime({y:2017,m:3}).toString("y-M-d h:m:s:i", true));//设置的时间
 */
export const getTime = (dateObj) => {
  var time = new Date();
  var time_Symbol = 0;
  if (dateObj) {
    'y' in dateObj ? time.setFullYear(dateObj.y) : '';
    'm' in dateObj ? time.setMonth(dateObj.m - 1) : '';
    'd' in dateObj ? time.setDate(dateObj.d) : '';
    'w' in dateObj ? time.setDay(dateObj.w) : '';
    'h' in dateObj ? time.setHours(dateObj.h) : '';
    'mm' in dateObj ? time.setMinutes(dateObj.mm) : '';
    's' in dateObj ? time.setSeconds(dateObj.s) : '';
    'i' in dateObj ? time.setMilliseconds(dateObj.i) : '';
  }

  var year = time.getFullYear(),
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
      case 'Y':
        return year;
      case 'y':
        return year;
      case 'M':
        return isPad ? (month < 10 ? '0' + month : month) : month;
      case 'D':
        return isPad ? (day < 10 ? '0' + day : day) : day;
      case 'd':
        return isPad ? (day < 10 ? '0' + day : day) : day;
      case 'h':
        return isPad ? (hour < 10 ? '0' + hour : hour) : hour;
      case 'H':
        return isPad ? (hour < 10 ? '0' + hour : hour) : hour;
      case 'm':
        return isPad ? (minutes < 10 ? '0' + minutes : minutes) : minutes;
      case 's':
        return isPad ? (seconds < 10 ? '0' + seconds : seconds) : seconds;
      case 'S':
        return isPad ? (seconds < 10 ? '0' + seconds : seconds) : seconds;
      case 'i':
        var i = msecond;
        if (i < 10) {
          i = '00' + i;
        } else if (i < 99 && i >= 10) {
          i = '0' + i;
        }
        return isPad ? i : msecond;
      case 'w':
        return isPad ? (week < 10 ? '0' + week : week) : week;
      case 'W':
        return isPad ? (week < 10 ? '0' + week : week) : week;
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
      var expressArrays = express.split('');
      var strFormat = '';
      for (const i in expressArrays) {
        strFormat += expressParse(expressArrays[i], isPad);
      }
      return strFormat;
    },
  };
};

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
export const Timer = (...arg) => {
  const [handler, count, o] = arg;
  var time_count = count;
  var time_Interval = 1000;
  count ? '' : (time_count = 1);
  arg.length > 2 && arg[2] > 0
    ? (time_Interval = arg[2])
    : (time_Interval = 1000);
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
};

// sys style color
/** get random a color of rgb
 * @returns rgba string
 */
export const getRgbRandom = () => {
  return (
    'rgb(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ')'
  );
};
/** get random a color of rgba
 * @returns rgb string
 */
export const getRgbaRandom = () => {
  return (
    'rgba(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.random().toFixed(2) +
    ')'
  );
};
// 去抖 debounce
export const debounce = (cb, delay = 100) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      cb();
      timer = null;
    }, delay);
  };
};
// 节流 throttle
export const throttle = (cb, delay = 100) => {
  let timer = null;
  return function () {
    if (!timer) return false;
    timer = setTimeout(function () {
      cb();
      timer = null;
    }, delay);
  };
};

/**数字字符串补齐函数
 * @param {* 数字字符串} number
 * @param {* 补齐的位数} o
 * @returns 返回补齐结果
 */
export const padInt = (...arg) => {
  let [number, o] = arg;
  o = o > 0 ? o : 1;
  var z = '0';
  number = parseInt(number).toString(10);
  z = arg.length > 2 ? arg[2] : '0';
  for (var i = 1; i <= o; i++) {
    if (number < Math.pow(10, i - 1)) {
      //如果
      number = z + '' + number;
    }
  }
  return number;
};

/**随机字符生成器 // console.log(randomChars("\A-aa-0000"));
 * 格式化生成验证码 A 代表大写字母 随机生成数字， 并转化层所对应Ascll 码对应的随机字母， 根据字母和数字的范围来生成
 * 合并了randomNumber 方法
 * @param {表达式* A 大写字母 a 小写字母 0 数字}  express:"A-A"= return "Q-F"
 * @param {max 最大值 ，此参数填写时 此函数变成随机数字生成器 第一个参数为最小值* Number} max
 * @returns 随机生成格式化的字符串
 */
export const getRandomChars = (...arg) => {
  const [express, max] = arg;
  var str = '';
  if (arg.length > 1) {
    return randomNumber(express, max);
  }

  function randomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }

  function randomChar(o) {
    // 单字符生成
    switch (o) {
      case 'a':
        return String.fromCharCode(randomNumber(97, 122));
      case 'A':
        return String.fromCharCode(randomNumber(65, 90));
      case '0':
        return String.fromCharCode(randomNumber(48, 57));
      default:
        return o;
    }
  }

  for (const key in express) {
    if (express[key - 1] === '\\') {
      str += express[key];
    } else if (express[key] !== '\\') {
      str += randomChar(express[key]);
    }
  }
  return str;
};

/**随机数的生成
 * @param {最小范围*} min
 * @param {*最大范围} max
 * @returns
 */
export const getRandomNumber = (...arg) => {
  let [min, max] = arg;
  if (arg.length === 1) {
    max = min;
    min = 0;
  }
  return min + Math.round(Math.random() * (max - min));
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
};

// 如果目标对象有相同名字的属性，不进行覆盖
Object._merge = function (o, p) {
  for (const key in p) {
    if (object.hasOwnProperty(key)) {
      if (o.hasOwnProperty[key]) continue;
      o[key] = object[key];
    }
  }
  return o;
};

//目标对象存在和选择对象不同的属性，删除之  像接口
Object._restrict = function (o, p) {
  for (const key in o) {
    if (key in p) {
      delete o[key];
    }
  }
  return o;
};

// 如果o中存在P的属性，删除之
Object._substract = function (o, p) {
  for (const key in p) {
    delete o[key];
  }
};

//返回新的对象 这个对象同时拥有参数对象中的属性 同名会覆盖 ；
Object._union = function () {
  var o = {};
  for (const key in arguments) {
    Object._extend(o, arguments[key]);
  }
  return o;
};

// 对象属性 求交集
Object._intersection = function () {
  var o = arguments[0];
  for (const key in arguments) {
    if (key == arguments.length) continue;
    o = Object._restrict(o, arguments[key + 1]);
  }
  return o;
};

/**
 *Cookie 兼容版本
 * @param {键*string} key
 * @param {值*string} value
 * @param {Set Cookie [ expires path domain secure ]* Object} options
 * @returns
 */
export const Cookie = (...arg) => {
  let [key, value, options] = arg;
  // Write
  var d, cookies, cookie, index;
  if (arg.length > 1) {
    typeof options === 'object' ? '' : (options = {});
    return (document.cookie = [
      key + '=' + value,
      options.expires
        ? '; expires=' +
          ((d = new Date()).setDate(
            d.getDate() + (isNaN(Number(options.expires)) ? 0 : options.expires)
          ) && d)
        : '',
      options.path ? '; path=' + options.path : '',
      options.domain ? '; domain=' + options.domain : '',
      options.secure ? '; secure' : '',
    ].join(''));
  }
  //Read
  for (
    cookies = document.cookie.split(' ;'), index = 0;
    cookies[index];
    index++
  ) {
    cookie = cookies[index].split('=');
    if (cookie[0] === key) return cookie[1];
  }
};

export const removeCookie = (key, path) => {
  return this.Cookie(key, '', {
    path: path ? path : '',
    expires: -1,
  });
};

export const localdb = (key, val) => {
  //  空 返回对象
  if (!key) {
    return this;
  }
  //  $ 开启 缓存模式
  else if (key === '$') {
    if (val) {
      //设置并操作
      return (this.setCach = this.setCach(val));
    } else {
      //查看缓存
      return this.cach();
    }
  } else if (key instanceof Function) {
    //Function 开启 获取缓存模式 如果不操作
    return this.cach(key);
    //  @ 开启 用户存储模式
  } else if (key === '@') {
    if (val) return this.user(val);
    return this.user();
  } else {
    return this.db(key, val);
  }
};
export const db = (key, val) => {
  let v = localStorage.getItem(key);
  v ? '' : localStorage.setItem(key, '[]');
  try {
    v = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log('LocalDBEngine.db try  JSON.parse is fail.');
  }

  if (arguments.length === 1) {
    return v;
  } else {
    if (val instanceof Array) {
      localStorage.setItem(key, JSON.stringify(val));
    } else if (val && typeof val === 'object') {
      v.push(val);
      v = JSON.stringify(v);
      localStorage.setItem(key, v);
      return {
        key: v,
      };
    }
  }
};
export const cach = (fn) => {
  let cachs = this.db('__cach__');
  if (cachs && cachs instanceof Array) {
    fn ? cachs.forEach(fn) : '';
  } else {
    return false;
  }
  return (this.cachs = cachs);
};
export const setCach = (data) => {
  return (this.cachs = this.db('__cach__', data));
};
export const user = (user) => {
  if (user) {
    return (this.users = this.db('__user', [user]));
  }
  user = (user = this.db('__user')[0]) ? user : false;
  return (this.users = user);
};

Array.prototype.max = function (option) {
  let val = Math.max.apply(false, this);
  if (option && option !== 'index') {
    return val;
  } else if (option && option === 'index') {
    return this.indexOf(val);
  }
  return {
    value: val,
    index: this.indexOf(val),
  };
};

/****Array min Val*/
Array.prototype.min = function (option) {
  let val = Math.min.apply(false, this);
  if (option && option !== 'index') {
    return val;
  } else if (option && option === 'index') {
    return this.indexOf(val);
  }
  return {
    value: val,
    index: this.indexOf(val),
  };
};

/**
 * @param {遍历*Array} arry
 * @param {对象属性*string} key
 * @param {属性值*} val
 */
export const fromArrayDelete = (arry, key, val) => {
  for (var i = 0, item; (item = arry[i++]); ) {
    if (item[key] === val) {
      return arry.splice(i - 1, 1);
    }
  }
};
