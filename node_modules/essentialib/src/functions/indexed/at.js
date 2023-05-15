const len = require('../util/len.js');

/**
 * `at`은 배열의 특정 인덱스에 있는 요소를 반환합니다. 음수 인덱스는 배열의 끝에서부터 요소를 반환합니다.
 * @alias nth
 * @this {Array | String} 순회할 객체
 * @param {Number} index 요소의 인덱스, 음수일 경우 배열의 끝에서부터 셈합니다.
 * @returns {*} `array`의 `index`번째 요소
 * @example
 * _([1, 2, 3]).at(1); // 2
 * _([1, 2, 3]).at(-1); // 3
 * _([1, 2, 3]).at(3); // undefined
 * _('abc').at(1); // 'b'
 */

function at(index) {
    if (index < 0) {
        index = len(this.wrap) + index;
    }
    return this.wrap[index];
};

module.exports = at;