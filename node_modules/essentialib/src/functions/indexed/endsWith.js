const tail = require('./tail.js');

/**
 * 객체의 마지막 요소와 인자로 받은 `item`이 같은지 비교합니다.
 * @this {Array | String} 순회할 객체
 * @param {*} item 비교할 요소
 * @returns {Boolean} 마지막 요소와 인자로 받은 `item`이 같으면 true, 아니면 false
 * @example 
 * _([1, 2, 3]).endsWith(3); // true
 * _('abc').endsWith('c'); // true
 */

function endsWith(item) {
    return this.equalf(tail.apply(this, []), item);
}

module.exports = endsWith;