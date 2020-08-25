/**原生的JS AJAX 请求的封装 包含Promise 状态机
 * @param url = "", 描述 发起请求的路径,
 * @param {Object * 请求描述} [{
 *    @param type = "get", 描述 发起请求的方法
 *    @param async = true,描述 是否异步
 *    @param contentType = "application/x-www-form-urlencoded",描述 请求的头部 contentType
 *    @param dataType = null 处理回传数据(不处理)|text(字符串)|json(对象),
 *    @param jsonp = null,  描述 请求是否为JSONP
 *    @param  jsonpCallback = null, 描述 请求的JSONP公共回调
 *    @param data = null,  描述 请求的传入参数
 *    @param timeout = false, 描述 请求的超时设置 0 为不设置 默认值
 *    @param error = error=>console.log("Request Error:"+error), 描述 请求的错误回调
 *    @param success = data=>console.log("Request Success ",data) 描述 请求的成功回调
 * }={}]
 * @returns
 */
export const ajax = (
  src,
  {
    url = '',
    type = 'get',
    dataType = null,
    async = true,
    contentType = 'application/x-www-form-urlencoded',
    headers = {
      'Content-type': contentType,
    },
    jsonp = null,
    jsonpCallback = null,
    data = null,
    timeout = false,
    error = (error) => console.log('Request Error:' + error),
    success,
  } = {}
) => {
  url = url === '' ? src : url;
  return new Promise(function (resolve, reject) {
    type = type.toUpperCase();
    let isGet = Boolean(type === 'GET'); // 获取请求类型
    let isJsonP = Boolean(jsonp && jsonp.length > 0); //是否JSONP
    let sendOBJ = null; //初始化发送字符串
    //生成数据提交字符串 和 URL;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      let dataStr = '';
      for (const key in data) {
        dataStr.length > 0
          ? (dataStr += `&${key}=${data[key]}`)
          : (dataStr += `${key}=${data[key]}`);
      }
      isGet || isJsonP ? (url += '?' + dataStr) : (sendOBJ = dataStr);
    }
    // 如果是Jsonp
    if (isJsonP) {
      let script = document.createElement('script');
      script.onload = function () {
        this.remove();
      };
      let jsonpCallbackName = jsonpCallback
        ? jsonpCallback
        : 'jsonpCallback' + Date.now();
      url += (/\?/.test(url) ? '&' : '?') + jsonp + '=' + jsonpCallbackName;
      window[jsonpCallbackName] = function (res) {
        switch (dataType) {
          case 'json':
            typeof res === 'string' ? (res = JSON.parse(res)) : '';
            break;
          case 'text':
            typeof res === 'string' ? '' : (res = JSON.stringify(res));
        }
        resolve(res);
      };
      script.src = url;
      document.body.appendChild(script);
    } else {
      // 正常的AJAX  请求
      let xhr = new XMLHttpRequest();
      xhr.open(type, url, async);

      Object.assign(headers, {
        'Content-type': contentType,
      });
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
      xhr.send(sendOBJ);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = xhr.responseText;
          switch (dataType) {
            case 'json':
              typeof res === 'string' ? (res = JSON.parse(res)) : '';
              break;
            case 'text':
              typeof res === 'string' ? '' : (res = JSON.stringify(res));
          }
          resolve(res);
          typeof success === 'function' ? success(res) : '';
        } else if (xhr.status != 200) {
          typeof error === 'function' ? error(xhr.responseText) : '';
          reject(xhr.responseText);
        }
      };
    }
    // eslint-disable-next-line no-empty
    if (Number(timeout) === 0 || isNaN(Number(timeout))) {
    } else {
      setTimeout(() => reject('The Request Timeout'), timeout);
    }
  });
};

/** ES6 fetch 的封装
 * fetchRequester
 * @param {请求的连接*string} url
 * @param {请求的配置*增加 data|type} options
 */
export const fetchRequester = (url, options) => {
  let config = Object.assign(
    {
      cache: 'no-cache',
      headers: {
        'user-agent': 'Mozilla/5.0',
        'content-type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        'Sec-Fetch-Mode': 'cors',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    },
    options
  );
  let { method, type, body, data } = config;

  config.method = type || method;
  config.method = options.method.toUpperCase();
  config.body = data || body;
  let datas = config.body;
  if (config.method === 'GET') {
    let dataStr = '';
    //生成数据提交字符串 和 URL;
    for (const key in datas) {
      dataStr.length > 0
        ? (dataStr += `&${key}=${datas[key]}`)
        : (dataStr += `${key}=${datas[key]}`);
    }
    url += '?' + dataStr;
    delete config.body;
  }
  delete config.type;
  delete config.data;
  this.config = config;
  return fetch(url, config);
};
