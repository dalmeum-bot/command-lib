/**
 * 대문자로 변환
 * @this {String} 대문자로 변환할 문자열
 * @returns {String} 대문자로 변환된 문자열
 * @example
 * _('abc').toUpper(); // 'ABC'
 */

function toUpper() {
    return this.wrap.toUpperCase();
};

module.exports = toUpper;