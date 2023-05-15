const each = require('../collection/each.js');

/**
 * 객체의 최댓값을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @returns {*} 객체의 최댓값
 * @example
 * _([1, 2, 3]).max(); // 3
 * _(new Set([1, 2, 3])).max(); // 3
 */

function max() {
    let max = null;
    each.apply(this, [v => {
        if (max < v || max === null) {
            max = v;
        }
    }]);
    
    return max;
};

module.exports = max;