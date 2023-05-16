/**
 * `this`가 생성자 함수인지 여부를 반환합니다.
 * @this {Function} 임의의 함수
 * @returns {boolean} `this`가 생성자 함수인지 여부
 * @example
 * _(Array).isConstructor(); // true
 * _(String).isConstructor(); // true
 * _(x => x + 2).isConstructor(); // false
 */

function isConstructor() {
    try {
        new this.wrap();
    } catch (err) {
        if (err.message.includes('is not a constructor')) {
            return false;
        }
    }
    return true;
}

module.exports = isConstructor;