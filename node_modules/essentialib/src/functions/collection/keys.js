const typename = require('../util/typename.js');
const map = require('./map.js');

/**
 * 객체의 키값들을 반환합니다.
 * @this {Array | String | Object | Map} 순회할 객체
 * @returns {Set | Array} 키값들로 이루어진 객체, 순서가 있는 객체는 Array, 없는 객체는 Set
 * @example
 * _([1, 2, 3]).keys(); // [0, 1, 2]
 * _('abc').keys(); // [0, 1, 2]
 * _({ 'a': 1, 'b': 2, 'c': 3 }).keys(); // Set { 'a', 'b', 'c' }
 * _((new Map([['a', 1], ['b', 2], ['c', 3]]))).keys(); // Set { 'a', 'b', 'c' }
 */

function keys() {
    switch (typename(this.wrap)) {
        case 'Array':
        case 'String':
            return map.apply(this, [(_, i) => i]);
        case 'Object':
            return new Set(Object.keys(this.wrap));
        case 'Map':
            return new Set(this.wrap.keys());
    };
}

module.exports = keys;