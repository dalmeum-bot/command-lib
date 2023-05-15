/**
 * 문자열을 대소문자 변환하여 반환합니다.
 * @this {String} 변환할 문자열
 * @param {String} format 'u' or 'U'는 대문자, 'd' or 'D'는 소문자, 그 외는 변환하지 않습니다.
 * @returns {String} 대소문자 변환된 문자열
 * @example
 * _('abc').toCaseFormat('u'); // 'Abc'
 * _('abc').toCaseFormat('UUU'); // 'ABC'
 * _('ABC').toCaseFormat('d d'); // 'aBc'
 * _('ABC').toCaseFormat('DUU'); // 'aBC'
 */

function toCaseFormat(format) {
    let result = "";

    for (let i = 0; i < this.wrap.length; i++) {
        if (format[i] === 'u' || format[i] === 'U') {
            result += this.wrap[i].toUpperCase();
        } else if (format[i] === 'd' || format[i] === 'D') {
            result += this.wrap[i].toLowerCase();
        } else {
            result += this.wrap[i];
        }     
    }

    return result;
};

module.exports = toCaseFormat;