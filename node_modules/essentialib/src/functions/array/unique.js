/**
 * 배열의 중복된 요소를 제거합니다.
 * @this {Array} 중복된 요소를 제거할 배열
 * @returns {Array} 중복된 요소가 제거된 배열
 * @example
 * _([1, 2, 3, 1, 2, 3]).unique(); // [1, 2, 3]
 * _(['a', 'b', 'c', 'a', 'b', 'c']).unique(); // ['a', 'b', 'c']
 */

function unique() {
    let ret = this.wrap;
    for (let i = 0; i < ret.length; i++) {
        for (let j = i + 1; j < ret.length; j++) {
            if (this.equalf(ret[i], ret[j])) {
                ret.splice(j, 1);
                j--;
            }
        }
    }
    return ret;
}

module.exports = unique;