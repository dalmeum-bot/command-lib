const typename = require('../util/typename.js');

/**
 * 배열의 `idx`번째 요소를 제거한 배열을 반환합니다.
 * @alias drop
 * @this {Array | String} 순회할 객체
 * @param {Number} idx 제거할 요소의 인덱스, 음수일 경우 배열의 끝에서부터의 거리로 계산됩니다.
 * @returns {Array | String} `idx`번째 요소를 제거한 배열
 * @example
 * _([1, 2, 3]).pop(1); // [1, 3]
 * _('abc').pop(1); // 'ac'
 * _([1, 2, 3]).pop(-1); // [1, 2]
 * _('abc').pop(-1); // 'ab'
 */

function pop(idx) {
    if (idx < 0) {
        idx += ret.length;
    }

    let ret = this.wrap;

    switch (typename(ret)) {
        case 'Array':
            ret.splice(idx, 1);
            break;
        case 'String':
            ret = ret.slice(0, idx) + ret.slice(idx + 1);
            break;
    }
    return ret;
};

module.exports = pop;