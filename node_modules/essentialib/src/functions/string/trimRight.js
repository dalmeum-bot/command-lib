/**
 * 문자열의 뒤에 지정된 문자들을 제거합니다.
 * @this {String} 변형할 문자열
 * @param {String} [chars=' \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자
 * @returns {String} 문자열 뒤에 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.
 * @example
 * _('  abc  ').trimRight(); // '  abc'
 * _('_-abc_-').trimRight('_-'); // '_-abc'
 */

function trimRight(chars) {
    chars = chars || ' \t\r\n\v\f';
    let ret = this.wrap;

    ret = ret.replace(new RegExp('[' + chars + ']+$'), '');

    return ret;
};

module.exports = trimRight;