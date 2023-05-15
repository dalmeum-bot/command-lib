const each = require('../collection/each.js');

/**
 * 객체의 모든 요소의 합을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @returns {*} 객체의 모든 요소의 합
 * @example
 * _([2, 3, 4]).sum(); // 9
 * _(new Set([2, 3, 4])).product(); // 9
 */

function sum() {
    let result = 0;
    each.apply(this, [v => {
        result += v;
    }]);

    return result;
};

module.exports = sum;