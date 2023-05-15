const typename = require('../util/typename.js');
const each = require('./each.js');

/**
 * 배열의 요소 중 하나라도 조건을 만족하는지 확인합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} condition 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Boolean} 하나라도 조건을 만족하면 `true`, 아니면 `false`
 * @example
 * _([1, 2, 3]).some(e => e > 2); // true
 * _('abc').some(e => e > 'b'); // true
 * _({ a: 1, b: 2, c: 3 }).some((v, k) => v > 2); // true
 */

function some(condition) {
    let ret = false;
    switch (typename(this.wrap)) {
        case 'Set':
            each.apply(this, [v => {
                if (condition(v)) {
                    ret = true;
                    return false;
                }
            }]);
            break;
        default:
            each.apply(this, [(v, i) => {
                if (condition(v, i)) {
                    ret = true;
                    return false;
                }
            }]);
    }

    return ret;
};

module.exports = some;