const typename = require('../util/typename.js');

/**
 * 각 요소에 대해 반환값이 없는 `viewer` 함수를 실행합니다.
 * @alias forEach
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} viewer 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {undefined} 반환값이 없습니다.
 * @example
 * _([1, 2, 3]).each(e => console.log(e)); // 1 2 3
 * _('abc').each(e => console.log(e)); // a b c
 * _({ a: 1, b: 2, c: 3 }).each((v, k) => console.log(v, k)); // 1 'a' 2 'b' 3 'c'
 * _(new Set([1, 2, 3])).each(e => console.log(e)); // 1 2 3
 * _(new Map([['a', 1], ['b', 2], ['c', 3]])).each((v, k) => console.log(v, k)); // 1 'a' 2 'b' 3 'c'
 */

function each(viewer) {
    let isBreak = false;
    switch (typename(this.wrap)) {
        case 'Array':
        case 'String':
            for (let i = 0; i < this.wrap.length; i++) {
                isBreak = viewer(this.wrap[i], i) === false;
                if (isBreak) break;
            }
            break;
        case 'Set':
            this.wrap.forEach(v => {
                isBreak = viewer(v) === false;
                if (isBreak) return false;
            });
            break;
        case 'Map':
            this.wrap.forEach((v, k) => {
                isBreak = viewer(v, k) === false;
                if (isBreak) return false;
            });
            break;
        case 'Object':
            for (let key in this.wrap) {
                isBreak = viewer(this.wrap[key], key) === false;
                if (isBreak) break;
            }
            break;
    }
};

module.exports = each;