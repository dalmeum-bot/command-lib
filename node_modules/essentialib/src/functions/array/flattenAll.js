const flattenDepth = require('./flattenDepth.js');

/**
 * 배열을 모두 평탄화 합니다.
 * @this {Array} 평탄화할 배열
 * @returns {Array} 모두 평탄화된 배열
 * @example
 * _([1, [2, [3, [4]], 5]]).flattenAll(); // [1, 2, 3, 4, 5]
 * _([1, [2, [3, [4]], 5], 6]).flattenAll(); // [1, 2, 3, 4, 5, 6]
 */

function flattenAll() {
    return flattenDepth.apply(this, [Infinity]);
};

module.exports = flattenAll;