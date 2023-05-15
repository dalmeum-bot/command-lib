const each = require('../collection/each.js');

/**
 * 객체에서 `value`와 일치하는 첫번째 요소의 인덱스를 반환합니다.
 * @this {Array | String} 순회할 객체
 * @param {*} value 찾을 값
 * @returns {Number} `value`의 인덱스, 없으면 `null`
 * @example
 * _([1, 2, 3]).find(2); // 1
 * _([1, 2, 3]).find(4); // null
 * _('abc').find('b'); // 1
 */

function find(value) {
    let pos = null;

    each.apply(this, [(item, idx) => {
        if (this.equalf(item, value)) {
            pos = idx;
            return false;
        }
    }]);

    return pos;
}

module.exports = find;