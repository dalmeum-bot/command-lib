const flattenDepth = require('./flattenDepth.js');

/**
 * 배열을 한 번 평탄화 합니다.
 * @this {Array} 평탄화할 배열
 * @returns {Array} 한 번 평탄화된 배열
 * @example
 * _([1, [2, [3, [4]], 5]]).flatten(); // [1, 2, [3, [4]], 5]
 */

// FIXME: example2 이거 chaining 안됨

function flatten() {
    return flattenDepth.apply(this, [1]);
};

module.exports = flatten;