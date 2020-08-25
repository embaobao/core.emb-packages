/**Creates an instance of ElementExtend.
 * @memberof ElementExtend 元素操作的扩展类库
 */

const ElementExtend = {
  _extend(key) {
    // 元素选择
    Node.prototype.getElement = function (selector) {
      var e = null;
      return (e = this.querySelectorAll(selector)).length === 1 ? e[0] : e;
    };
    //获取元素发宽高的原生封装
    Node.prototype.getSize = function () {
      return {
        w: parseInt(getComputedStyle(this)['width']),
        h: parseInt(getComputedStyle(this)['height']),
      };
    };

    //获取元素页面的绝对位置 的原生封装
    Node.prototype.getPosition = function () {
      var position = {
        left: this.offsetLeft,
        top: this.offsetTop,
      };
      if (this.offsetParent === document.body) {
        return position;
      } else {
        var pos = this.offsetParent.getAbsPosition();
        return {
          left: this.offsetLeft + pos.left,
          top: this.offsetTop + pos.top,
        };
      }
    };
    //获取元素的属性 的原生封装
    Element.prototype.attr = function attr(key, val) {
      if (arguments.length > 1) {
        //如果值为2个 则为设置
        return this.setAttribute(key, val);
      } else {
        return this.getAttribute(key); //如果值为1个 则为获取
      }
    };
    //模糊 支持正则的获取元素多属性 的原生封装
    Node.prototype.attrs = function (key, val) {
      key ? (key = key) : (key = '.');
      var attrReg = new RegExp(key, 'i');
      var attrs = [];
      var isSet = arguments.length <= 1 ? false : true;
      [].slice.call(this.attributes).forEach((element) => {
        if (attrReg.test(element.name)) {
          attrs.push(element);
          isSet ? this.attr(element.name, val) : '';
        }
      });
      return attrs;
    };
    //设置、获取元素的html
    Element.prototype.html = function (html) {
      if (!arguments[0]) return this.innerHTML;
      this.innerHTML = html;
    };
    //设置、获取元素的Text
    Element.prototype.text = function (txt) {
      if (!arguments[0]) return this.innerText;
      this.innerText = txt;
    };
    //设置、获取元素的value
    Element.prototype.val = function (val) {
      if (!arguments[0]) return this.value;
      this.value = val;
    };
    //设置元素的隐藏
    Element.prototype.hide = function () {
      this.style.display = 'none';
    };
    //设置元素的显示
    Element.prototype.show = function () {
      this.style.display = 'block';
    };

    /**元素的 样式类添加
     * @param{className 类名}
     * @param{ notJudge 是否判断存在 可否进行重复添加 }
     * @returns undefine
     */
    Node.prototype.classAdd = function (className, notJudge) {
      notJudge = notJudge ? notJudge : false;
      var hasClassReg = new RegExp('s?' + className, 'g');
      if (notJudge) {
        this.className += ' ' + className;
      } else {
        hasClassReg.test(this.className)
          ? (this.className = this.className.replace(hasClassReg, className))
          : (this.className +=
              (this.className[this.className.length - 1] === ' ' ? '' : ' ') +
              className);
      }
    };

    /**元素的 样式类删除*/
    Node.prototype.classRemove = function (className) {
      return (this.className = this.className.replace(
        new RegExp('S?' + className),
        ''
      ));
    };
    /***当前节点加入到某个(选择器|元素节点)元素*/
    Node.prototype.appendTo = function (selector) {
      var element = selector.nodeType === 1 ? selector : _(selector);
      element.appendChild(this);
      return this;
    };

    // 事件绑定的封装 可选冒泡
    Node.prototype.onIscapture = function (eventType, handler, isCapture) {
      arguments.length > 2 && isCapture ? '' : (isCapture = false);
      if (this.addEventListener) {
        this.addEventListener(eventType, handler, isCapture);
      } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
      } else {
        this['on' + eventType] = handler;
      }
    };

    // 事件的委托的实现
    window.delegation = function delegation(executeHandler, targetSelector) {
      return function (ev) {
        // 我本人认为第一步应先给监听事件要的东西， 就是执行事件对吧？
        // 这个函数被作为传进去的执行者，那么他是不是接受了事件对象？嘿嘿
        var e = ev || window.event; // 获取到了事件对象
        // 获取当前捕获元素
        var captureElemet = e.target || e.srcElement;
        //获取要执行的目标元素
        var targetElemets = this.querySelectorAll(targetSelector);
        var targetFamilay = []; //抓住一家子
        var _targetemp = captureElemet;
        while (true) {
          if (_targetemp === this || _targetemp === null) break;
          //  2019.7.15 bug0.0.6_1 修改
          // 2019.7.17 bug0.0.6_2 修改  增加为Null的判断
          targetFamilay.push(_targetemp);
          _targetemp = _targetemp.parentNode;
        }
        if (!targetFamilay.length) return false;
        // console.log(captureElemet, this);
        // 那是不是 执行目标和捕获目标相同 就执行就好了？
        // 但是我们的目标元素不是一堆啊? 那是不是得一一辨认？
        for (var i = 0, targetItem; (targetItem = targetElemets[i++]); ) {
          if (
            targetFamilay.length === 1
              ? captureElemet == targetItem
              : targetFamilay.indexOf(targetItem) !== -1
          ) {
            // 如果是这个目标 那就杠
            executeHandler.call(targetItem, e);
            //执行事务 ,并把执行事务 的参数给人家句柄
            //指向执行的人，事件对象给执行句柄
          }
        }
      };
    };

    /**事件的绑定 -委托机制
     * @param{ eventType 事件类型}
     * @param{ handler 执行句柄}
     * @param{ targetSelector 选择器->绑定的执行目标 }
     * @returns undefine
     */
    Node.prototype.on = function (eventType, targetSelector, handler) {
      if (this.addEventListener) {
        if (targetSelector instanceof Function) {
          this.addEventListener(eventType, targetSelector);
        } else {
          arguments.length > 2 && targetSelector
            ? this.addEventListener(
                eventType,
                delegation(handler, targetSelector)
              )
            : this.addEventListener(eventType, handler);
        }
      } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
      } else {
        this['on' + eventType] = handler;
      }
    };

    // 事件移除的封装
    Node.prototype.off = function (eventType, handler) {
      if (this.removeEventListener) {
        this.removeEventListener(eventType, handler);
      } else if (this.detachEvent) {
        this.detachEvent(eventType, handler);
      } else {
        this['on' + eventType] = null;
      }
    };

    /**
     *
     * 扩展的选择器方法 |仿 JQ
     * @param {选择符*String} selecter
     * @returns 返回选中的元素对象或者元素的集合
     */
    window.getElement = function (selecter) {
      var ele = null; //待返回的对象
      return (ele = document.querySelectorAll(selecter)).length === 1
        ? ele[0]
        : ele;
      //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
    };
    try {
      if (key) return this[key];
    } catch (error) {
      console.error('没有:' + key + '扩展 ！ 错误详情：' + error);
    }
    return this;
  },

  getElement(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1
      ? ele[0]
      : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
  },
  /**元素创建
   * @param {
   * {
   * tagName:""*string
   * attr:{}//*object
   * html:""// content* string
   * children:[] 子元素集合
   * } *object} object
   * @returns 创建的元素
   */
  createElement(object) {
    typeof object === 'undefine' ? (object = {}) : ''; // 如果传进去的参数是undefine 那么赋值空对象
    object.tagName ? '' : (object.tagName = 'div');
    //如果对象tagName是空，那么给他默认值为div
    var ele = document.createElement(object.tagName);
    object.attr ? '' : (object.attr = {});
    object.value ? (object.attr.value = object.value) : '';
    object.id ? (object.attr.id = object.id) : '';
    object.title ? (object.attr.title = object.title) : '';
    object.style ? (object.attr.style = object.style) : '';
    object.name ? (object.attr.name = object.name) : '';
    object.type ? (object.attr.type = object.type) : '';
    object.class ? (object.attr.class = object.class) : '';
    //创建对象
    for (const key in object.attr) {
      ele.setAttribute(key, object.attr[key]);
    }
    // 遍历DOM元素的属性和属性值并添加到元素
    ele.innerHTML = object.html ? object.html : '';
    //添加元素的内容 HTML
    for (var i = 0, item; object.children && (item = object.children[i++]); ) {
      //在子元素列表拥有的情况才进行遍历
      item.nodeType === 1
        ? ele.appendChild(item)
        : ele.appendChild(createElement(item));
      //如果元素的节点类型为 元素对象 那么就给他添加到 创建的元素中，否则就给他先创建后再添加到创建的元素中。
    }
    return ele;
  },
};

module.exports = ElementExtend;
