const array = require('./array')
const element = require('./element')
const localdb = require('./store/localdb')
const math = require('./math/math')
const object = require('./object/object')
const requester = require('./ajax/requester')
const string = require('./string/string')
const style = require('./style/style')
const time = require('./bom/time')
const url = require('./bom/url')


const System = {
    array,
    element,
    localdb,
    math,
    object,
    requester,
    string,
    style,
    time,
    url
};


function init() {
    const keys = Object.keys(System);
    keys.forEach(key => {
        let models = System[key];
        models._extend();
    });
}



module.exports = {
    init,
    System
};