/**
 * 배열의 `by` 함숫값이 중복된 요소를 제거합니다.
 * @this {Array} 원본 배열
 * @param {Function} by 요소마다 호출할 함수, 첫 번째 인수에는 요소가 전달됩니다.
 * @returns {Array} 중복된 요소가 제거된 배열
 * @example
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).uniqueBy(v => v % 2); // [1, 2]
 * _([1.1, 1.2, 2.1, 2.2, 3.1, 3.2]).uniqueBy(Math.floor); // [1.1, 2.1, 3.1]
 * _([{ a: 1 }, { a: 2 }, { a: 1 }]).uniqueBy(v => v.a);_([{ a: 1 }, { a: 2 }, { a: 1 }]).uniqueBy(v => v.a); // [{ a: 1 }, { a: 2 }]
 */

function uniqueBy(by) {
    let ret = this.wrap;
    for (let i = 0; i < ret.length; i++) {
        for (let j = i + 1; j < ret.length; j++) {
            if (this.equalf(by(ret[i]), by(ret[j]))) {
                ret.splice(j, 1);
                j--;
            }   
        }
    }
    return ret;
}

module.exports = uniqueBy;