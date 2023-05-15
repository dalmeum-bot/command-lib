const reach = require('../collection/reach.js');

/**
 * 객체에서 `value`와 일치하는 마지막 요소의 인덱스를 반환합니다.
 * @this {Array | String} 순회할 객체
 * @param {*} value 찾을 값
 * @returns {Number} `value`의 인덱스, 없으면 `null`
 * @example
 * _([1, 2, 1, 2, 3]).rfind(2); // 3
 * _([1, 2, 3]).rfind(4); // null
 */

function rfind(value) {
    let pos = null;

    reach.apply(this, [(item, idx) => {
        if (this.equalf(item, value)) {
            pos = idx;
            return false;
        }
    }]);
    
    return pos;
}

module.exports = rfind;