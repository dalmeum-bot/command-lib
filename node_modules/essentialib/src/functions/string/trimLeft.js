/**
 * 문자열의 앞에 지정된 문자들을 제거합니다.
 * @this {String} 변형할 문자열
 * @param {String} [chars=' \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자
 * @returns {String} 문자열 앞에 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.
 * @example
 * _('  abc  ').trimLeft(); // 'abc  '
 * _('_-abc_-').trimLeft('_-'); // 'abc_-'
 */

function trimLeft(chars) {
    chars = chars || ' \t\r\n\v\f';
    let ret = this.wrap;

    ret = ret.replace(new RegExp('^[' + chars + ']+'), '');

    return ret;
};

module.exports = trimLeft;