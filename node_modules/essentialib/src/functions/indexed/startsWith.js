const head = require('./head.js');

/**
 * 객체의 첫번째 요소와 인자로 받은 `item`이 같은지 비교합니다.
 * @this {Array | String} 순회할 객체
 * @param {*} item 비교할 요소
 * @returns {Boolean} 첫번째 요소와 인자로 받은 `item`이 같으면 true, 아니면 false
 * @example
 * _([1, 2, 3]).startsWith(1); // true
 * _('abc').startsWith('a'); // true
 */

function startsWith(item) {
    return this.equalf(head.apply(this, []), item);
}

module.exports = startsWith;