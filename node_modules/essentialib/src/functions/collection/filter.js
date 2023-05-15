const typename = require('../util/typename.js');
const each = require('./each.js');

/**
 * 객체의 요소를 조건에 맞게 필터링합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} condition 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Set | String | Array | Map | Object} 조건에 맞는 요소들로 이루어진 객체
 * @example
 * _([1, 2, 3]).filter(e => e > 1); // [2, 3]
 * _('abc').filter(e => e > 'a'); // 'bc'
 * _({ a: 1, b: 2, c: 3 }).filter((v, k) => v > 1); // { b: 2, c: 3 }
 */

function filter(condition) {
    let ret;
    
    switch (typename(this.wrap)) {
        case 'Set':
            ret = new Set();
            each.apply(this, [e => {
                if (condition(e)) {
                    ret.add(e);
                }
            }]);
            break;
        case 'String':
            ret = '';
            each.apply(this, [(e, i) => {
                if (condition(e, i)) {
                    ret += e;
                }
            }]);
            break;
        case 'Array':
            ret = [];
            each.apply(this, [(e, i) => {
                if (condition(e, i)) {
                    ret[ret.length] = e;
                }
            }]);
            break;
        case 'Map':
            ret = new Map();
            each.apply(this, [(v, k) => {
                if (condition(v, k)) {
                    ret.set(k, v);
                }
            }]);
            break;
        case 'Object':
            ret = {};
            each.apply(this, [(v, k) => {
                if (condition(v, k)) {
                    ret[k] = v;
                }
            }]);
            break;
    }

    return ret;
};

module.exports = filter;