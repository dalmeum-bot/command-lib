const typename = require('../util/typename.js');

/**
 * 객체의 값 중 `from`을 전부 `to`로 바꿉니다.
 * @this {Array | String} 순회할 객체
 * @param {*} from 바꿀 값
 * @param {*} to 바뀔 값
 * @returns {*} 모든 `from`을 `to`로 바꾼 객체
 * @example
 * _("aabbcc").replace("a", "b"); // 'bbbbcc'
 * _([1, 2, 1, 2, 2, 3]).replace(2, 3); // [1, 3, 1, 3, 3, 3]
 */

function replace(from, to) {
    switch (typename(this.wrap)) {
        case "array":
            return this.wrap.map(e => {
                if (this.equalf(e, from)) {
                    return to;
                } else {
                    return e;
                }
            });
        case "string":
            return this.wrap.split(from).join(to);
    }
}

module.exports = replace;