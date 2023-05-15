const typename = require('../util/typename.js');
const each = require('./each.js');

/**
 * 객체의 값들을 반환합니다.
 * @this {Array | String | Object | Map | Set} 순회할 객체
 * @returns {Set | Array} 값들로 이루어진 객체, 순서가 있는 객체는 Array, 없는 객체는 Set
 * @example
 * _([1, 2, 3]).values(); // [1, 2, 3]
 * _('abc').values(); // ['a', 'b', 'c']
 * _({ 'a': 1, 'b': 2, 'c': 3 }).values(); // Set { 1, 2, 3 }
 */

function values() {
    switch (typename(this.wrap)) {
        case 'Array':
        case 'String':
            let ret = [];
            each.apply(this, [v => ret[ret.length] = v]);
            return ret;
        case 'Object':
            let vs = [];
            each.apply(this, [v => vs[vs.length] = v]);
            return new Set(vs);
        case 'Map':
            return new Set(this.wrap.values());
        case 'Set':
            return this.wrap;
    };
}

module.exports = values;