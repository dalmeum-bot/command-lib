function getDepth() {
    const dep = array => {
        return Array.isArray(array) ? 
                1 + Math.max.apply(null, array.map(dep)) :
                0;
    };

    return dep(this.wrap);
};

/**
 * 배열의 깊이를 구한다.
 * @this {Array} 깊이를 구할 배열
 * @returns {Number} 배열의 깊이
 * @example
 * _([1, 2, 3]).getDepth(); // 1
 * _([1, [2, [3, [4]], 5]]).getDepth(); // 4
 */

module.exports = getDepth;