const typename = require('../util/typename.js');
const each = require('./each.js');

/**
 * 객체에서 조건에 맞지 않는 요소들을 반환합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} condition 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Set | String | Array | Map | Object} 조건에 맞지 않는 요소들로 이루어진 객체
 * @example
 * _([1, 2, 3]).filterNot(e => e > 1); // [1]
 * _('abc').filterNot(e => e > 'a'); // 'a'
 * _({ a: 1, b: 2, c: 3 }).filterNot((v, k) => v > 1); // { a: 1 }
 */

function filterNot(condition) {
    let ret;
    
    switch (typename(this.wrap)) {
        case 'Set':
            ret = new Set();
            each.apply(this, [e => {
                if (!condition(e)) {
                    ret.add(e);
                }
            }]);
            break;
        case 'String':
            ret = '';
            each.apply(this, [(e, i) => {
                if (!condition(e, i)) {
                    ret += e;
                }
            }]);
            break;
        case 'Array':
            ret = [];
            each.apply(this, [(e, i) => {
                if (!condition(e, i)) {
                    ret[ret.length] = e;
                }
            }]);
            break;
        case 'Map':
            ret = new Map();
            each.apply(this, [(e, k) => {
                if (!condition(e, k)) {
                    ret.set(k, e);
                }
            }]);
            break;
        case 'Object':
            ret = {};
            each.apply(this, [(e, k) => {
                if (!condition(e, k)) {
                    ret[k] = e;
                }
            }]);
            break;
    }

    return ret;
};

module.exports = filterNot;