/**
 * 배열의 마지막 원소를 반환합니다.
 * @alias last, back
 * @this {Array | String} 순회할 객체
 * @returns {*} 배열의 마지막 원소
 * @example
 * _([1, 2, 3]).tail(); // 3
 * _('abc').tail(); // 'c'
 * _([]).tail(); // undefined
 */

function tail() {
    return this.wrap[this.wrap.length - 1];
};

module.exports = tail;