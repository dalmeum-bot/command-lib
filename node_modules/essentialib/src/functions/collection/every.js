const typename = require('../util/typename.js');
const each = require('./each.js');

/**
 * 배열의 모든 요소가 조건을 만족하는지 확인합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} condition 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Boolean} 모든 요소가 조건을 만족하면 `true`, 아니면 `false`
 * @example
 * _([1, 2, 3]).every(e => e > 0); // true
 * _('abc').every(e => e > 'a'); // false
 * _({ a: 1, b: 2, c: 3 }).every((v, k) => v > 0); // true
 */

function every(condition) {
    let ret = true;
    switch (typename(this.wrap)) {
        case 'Set':
            each.apply(this, [v => {
                if (!condition(v)) {
                    ret = false;
                    return false;
                }
            }]);
            break;
        default:
            each.apply(this, [(v, i) => {
                if (!condition(v, i)) {
                    ret = false;
                    return false;
                }
            }]);
    }

    return ret;
};

module.exports = every;