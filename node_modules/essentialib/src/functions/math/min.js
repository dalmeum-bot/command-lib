const each = require('../collection/each.js');

/**
 * 객체의 최솟값을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @returns {*} 객체의 최솟값
 * @example
 * _([1, 2, 3]).min(); // 1
 * _(new Set([1, 2, 3])).min(); // 1
 */

function min() {
    let min = null;
    each.apply(this, [v => {
        if (min > v || min === null) {
            min = v;
        }
    }]);
    
    return min;
}

module.exports = min;