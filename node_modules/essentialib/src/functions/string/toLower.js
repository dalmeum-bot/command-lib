/**
 * 소문자로 변환
 * @this {String} 소문자로 변환할 문자열
 * @returns {String} 소문자로 변환된 문자열
 * @example
 * _('ABC').toLower(); // 'abc'
 */

function toLower() {
    return this.wrap.toLowerCase();
}

module.exports = toLower;