const typename = require('../util/typename.js');

/**
 * 객체을 반복해서 연장합니다.
 * @this {Array | String} 순회할 객체
 * @param {Number} n 반복 횟수, `fix`가 `true`이면 최종 객체의 길이를 의미합니다. 실수가 허용됩니다.
 * @param {Boolean} [fix=false] 객체의 길이를 고정할지 여부, 기본값은 `false`입니다.
 * @returns {Array | String} 반복된 객체
 * @example
 * _([1, 2, 3]).repeat(2); // [1, 2, 3, 1, 2, 3]
 * _('abc').repeat(2); // 'abcabc'
 * _([1, 2, 3, 4]).repeat(2.5); // [1, 2, 3, 4, 1, 2, 3, 4, 1, 2]
 * 
 * _([1, 2, 3]).repeat(2.3333...); // 의도는 [1, 2, 3, 1, 2, 3, 1] 이지만 `n`에 정확한 7/3 값을 입력할 수 없음
 * _([1, 2, 3]).repeat(7, true) // 이 때 `fix`를 true로 고정해 [1, 2, 3, 1, 2, 3, 1]를 얻을 수 있음
 */

// TODO: `n`에 Rational 클래스 사용

function repeat(n, fix) {
    fix = fix || false;
    
    let ret;
    let length = fix ? n : n * this.wrap.length;

    if (!Number.isInteger(length)) {
        throw new Error("The length of string should be integer.");
    }

    switch (typename(this.wrap)) {
        case "string":
            ret = "";
            for (let i = 0; i < length; i++) {
                ret += this.wrap[i % this.wrap.length];
            }

            break;
        case "array":
            ret = [];
            for (let i = 0; i < length; i++) {
                ret[i] = this.wrap[i % this.wrap.length];
            }
            
            break;
    }

    return ret;
};

module.exports = repeat;