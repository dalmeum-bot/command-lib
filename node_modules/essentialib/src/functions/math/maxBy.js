const each = require("../collection/each.js");

/**
 * 객체의 요소 중 `by` 함수의 반환값이 가장 큰 요소를 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @param {Function} [by=(e => e)] 요소마다 호출할 함수, 첫번째 인자는 요소(value)
 * @returns {*} `by` 함수의 반환값이 가장 큰 요소
 * @example
 * _([{a: 1}, {a: 2}, {a: 3}]).maxBy(v => v.a); // {a: 3}
 */

function maxBy(by) {
    by = by || (v => v);

    let max = null;
    each.apply(this, [v => {
        if (by(max) < by(v) || max === null) {
            max = v;
        }
    }]);
    
    return max;
};

module.exports = maxBy;