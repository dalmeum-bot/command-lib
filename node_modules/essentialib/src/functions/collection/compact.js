const filter = require('./filter.js');

/**
 * falsy한 값을 제거한 배열를 반환합니다.
 * @alias truthly
 * @this {Array | String | Object | Set | Map} falsy한 값을 제거할 배열
 * @returns {Array} 배열에서 falsy한 값이 제거된 배열
 * @example
 * _([0, false, '', null, undefined, NaN, 1, 2, 3]).compact(); // [1, 2, 3]
 */

function compact() {
    return filter.apply(this, [Boolean]);
};

module.exports = compact; 