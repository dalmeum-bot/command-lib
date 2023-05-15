/**
 * 배열의 첫번째 요소를 반환한다.
 * @alias first, front
 * @this {Array | String} 순회할 객체
 * @returns {*} 배열의 첫번째 요소
 * @example
 * _([1, 2, 3]).head(); // 1
 * _('abc').head(); // 'a'
 * _([]).head(); // undefined
 */

function head() {
    return this.wrap[0];
};

module.exports = head;