const typename = require('../util/typename.js');

/**
 * 각 요소에 대해 반환값이 없는 `viewer` 함수를 역순으로 실행합니다.
 * @alias rforEach
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} viewer 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {undefined} 아무것도 반환하지 않습니다.
 * @example
 * _([1, 2, 3]).reach(e => console.log(e)); // 3, 2, 1
 * _('abc').reach(e => console.log(e)); // 'c', 'b', 'a'
 */

function reach(viewer) {
    switch (typename(this.wrap)) {
        case 'Array':
        case 'String':
            for (let i = this.wrap.length - 1; i >= 0; i--) {
                viewer(this.wrap[i], i);
            }
            break;
        case 'Map':
            for (let i = this.wrap[Symbol.iterator]().next(); !i.done; i = this.wrap[Symbol.iterator]().next()) {
                viewer(i.value[1], i.value[0]);
            }
            break;
        case 'Set':
            for (let i = this.wrap[Symbol.iterator]().next(); !i.done; i = this.wrap[Symbol.iterator]().next()) {
                viewer(i.value);
            }
            break;
        case 'Object':
            for (let key in this.wrap) {
                viewer(this.wrap[key], key);
            }
            break;
    }
};

module.exports = reach;