/**
 * 문자열의 앞뒤에 지정된 문자들을 제거합니다.
 * @this {String} 변형할 문자열
 * @param {String} [chars=' \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자
 * @returns {String} 문자열 앞뒤로 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.
 * @example
 * _('  abc  ').trim(); // 'abc'
 * _('_-abc_-').trim('_-'); // 'abc'
 */

function trim(chars) {
    chars = chars || ' \t\r\n\v\f';
    let ret = this.wrap;

    ret = ret.replace(new RegExp('^[' + chars + ']+'), '');
    ret = ret.replace(new RegExp('[' + chars + ']+$'), '');

    return ret;
};

module.exports = trim;