const array = require('./array')
const element = require('./element')
const localdb = require('./localdb')
const math = require('./math')
const object = require('./object')
const requester = require('./requester')
const string = require('./string')
const style = require('./style')
const time = require('./time')
const url = require('./url')


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