const each = require('../collection/each.js');

/**
 * 객체의 모든 요소의 곱을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @param {Function} [by=(e => e)] 요소마다 호출할 함수, 첫번째 인자는 요소(value)
 * @returns {*} 객체의 모든 요소의 곱
 * @example
 * _([{a: 2}, {a: 3}, {a: 4}]).productBy(v => v.a); // 24
 */

function productBy(by) {
    by = by || (k => k);

    let result = 1;
    each.apply(this, [v => {
        result *= by(v, this.wrap.length);
    }]);

    return result;
};

module.exports = productBy;