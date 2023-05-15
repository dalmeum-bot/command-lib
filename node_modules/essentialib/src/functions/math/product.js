const each = require('../collection/each');

/**
 * 객체의 모든 요소의 곱을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @returns {*} 객체의 모든 요소의 곱
 * @example
 * _([2, 2, 3]).product(); // 12
 * _(new Set([2, 3, 4])).product(); // 24
 */

function product() {
    let result = 1;
    each.apply(this, [v => {
        result *= v;
    }]);

    return result;
};

module.exports = product;