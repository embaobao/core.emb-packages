/****常量
 * F  函数
 * O  对象
 */

//函数
const F = 'function'

/****函数 常量
 *  var a =()=>{} 
 *  typeof function 类型
 *  typeof a =function
 * 
 *  instanceof Object 实例继承
 *  a instanceof Object true
 *  a instanceof Function true
 */
function isFunction(fn) {
    if (fn && typeof fn === F && fn instanceof Function) {
        return true
    }
    return false
}


// 对象
const O = 'object'

/****函数 常量
 *  var a ={}
 * 
 *  typeof object 类型
 * 
 *  typeof a= "object"
 *  
 *  instanceof Object 实例继承
 *  a instanceof Object true
 *  a instanceof Function false
 */


function isObject(o) {


    if (o && typeof o === O && o instanceof Object && !(o instanceof Array) && !(o instanceof String) && !(o instanceof Number) && !(o instanceof RegExp)) {
        try {
            o.constructor.name === "Object"
            return true
        } catch (error) {

        }
        return true
    }
    return false
}


// 数组
const A = 'array'

/****数组 常量
 *  var a =[]
 * 
 *  typeof object 类型
 * 
 *  typeof a "object"
 *  
 *  instanceof Object 实例继承
 *  a instanceof Object true
 *  a instanceof Function false
 *  a instanceof Array true
 */

function isArray(o) {
    if (o && o instanceof Array) {
        return true
    }
    return false
}



// 字符
const S = 'string'

/****字符 常量
 *  var a =''
 * 
 *  var c =new String('c')
 *  typeof object 类型
 * 
 *    typeof a "string"
 *  
 *  instanceof Object 实例继承
 *  a instanceof Object false
 *  a instanceof Function false
 *  a instanceof Array false
 *  a instanceof String false
 * 
 *    typeof c "object"
 * 
 *  c instanceof Object true
 *  c instanceof String true
 *  c instanceof Array false
 *  c instanceof Function false
 */


function isString(o) {
    if (o && (typeof o === S || (o instanceof String))) {
        return true
    }
    return false
}



// null
const NULL = 'null'

/****null 常量
 *  var a =null
 * 
 *  typeof object 类型
 * 
 *  typeof a "object"
 *  
 *  a===null true
 *  undefined ===null false
 *  a ===undefined false
 *  instanceof Object 实例继承
 *  a instanceof Object false
 *  a instanceof Function false
 *  a instanceof Array false
 *  a instanceof String false
 * 
 */

function isNull(params) {
    if (o === null) {
        return true
    }
    return false
}




// undefined
const UNDEFINED = 'undefined'

/****undefined 常量
 *  var a = undefined
 * 
 *  typeof undefined 类型
 * 
 *  typeof a "undefined"
 *  
 *  undefined===undefined true
 * 
 *  a===undefined true
 * 
 *  a instanceof Object false
 *  a instanceof Function false
 *  a instanceof Array false
 *  a instanceof String false
 */

function isUndefine(params) {
    if (o === undefined) {
        return true
    }
    return false
}


// 数字常量
const N = 'number'


/**** 数字 number 常量
 *  var a = 1
 *  var c =new Number(1)
 *  
 *  typeof number 类型
 * 
 *  typeof a "number"
 *  typeof c "object"
 * 
 *  a instanceof Object false
 *  a instanceof Function false
 *  a instanceof Array false
 *  a instanceof String false
 *  a instanceof Number false
 *   
 *  c instanceof Object true
 *  c instanceof Number true
 *  
 */


function isNumber(o) {
    if (o && (typeof o === N || (o instanceof Number))) {
        return true
    }
    return false
}


// 正则常量
const R = 'regexp'

/**** 正则 常量
 *  var a = /'a'/
 *  var c=new RegExp('a')
 * 
 *  typeof object 类型
 * 
 *  typeof a "object"
 *  typeof c "object"
 * 
 *  a instanceof Object true
 *  c instanceof Object true
 * 
 *  a instanceof Function false
 *  c instanceof Function false
 * 
 *  a instanceof String false
 *  c instanceof String false
 *   
 *  a instanceof RegExp true
 *  c instanceof RegExp
 */


function isRegExp(o) {
    if (o && (o instanceof RegExp)) {
        return true
    }
    return false
}


function Type(o) {
   if(isNull(o)) return  NULL
   if(isUndefine(o)) return  UNDEFINED
   if(isObject(o)) return   O
   if(isArray(o)) return  A
   if(isFunction(o)) return  F
   if(isString(o)) return  S
   if(isNumber(o)) return  N
   if(isRegExp(o)) return  R
   return false
}

