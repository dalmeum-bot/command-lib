const each = require('../collection/each.js');

/**
 * 객체의 모든 요소의 합을 반환합니다.
 * @this {Array | Set} 순회할 객체
 * @param {Function} [by=(e => e)] 요소마다 호출할 함수, 첫번째 인자는 요소(value)
 * @returns {*} 객체의 모든 요소의 합
 * @example
 * _([{a: 1}, {a: 2}, {a: 4}]).sumBy(v => v.a); // 7
 */

function sumBy(by) {
    by = by || (k => k);

    let result = 0;
    each.apply(this, [v => {
        result += by(v, this.wrap.length);
    }]);

    return result;
};

module.exports = sumBy;