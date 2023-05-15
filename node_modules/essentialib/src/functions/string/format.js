const typename = require('../util/typename.js');

let formatByKey = (str, obj) => {
    return str.split('{{}}').map(s => s.replace(/{([^{}]+)}/g, (_, key) => obj[key.trim()])).join('{}');
};

let formatByIndex = (str, values) => {
    let idx = 0;
    return str.split('{{}}').map(s => s.replace(/{(\d*)}/g, (matched, index) => {
        if (index !== '') {
            return values[index] || matched;
        } else {
            return values[idx++];
        }
    })).join('{}');
};

/**
 * 문자열을 포매팅합니다.
 * @alias f
 * @this {String} 포맷 문자열
 * @param {...* | Object} options 포맷 문자열에 대입할 값입니다.
 * @returns {String} 포맷된 문자열을 반환합니다.
 * @example
 * _('Hello, {name}!').format({ name: 'world' }); // 'Hello, world!'
 * _('Hello, {0}!').format('world'); // 'Hello, world!'
 * _('{} {} {}').format('a', 'b', 'c'); // 'a b c', 인덱스는 자동으로 지정되며 1씩 증가합니다.
 * _('{} {} {}').format('a', 'b'); // 'a b {}', 인덱스가 부족하면 그대로 출력됩니다.
 * _('{} {} {}').format('a', 'b', 'c', 'd'); // 'a b c', 인덱스가 초과하면 무시됩니다.
 * _('{} {1} {}').format('a', 'b', 'c'); // 'a b b', 직접 인덱스를 지정하면 자동으로 증가하지 않고 한 차례 밀립니다.
 * _('hello {}, {{}}').format('world', 'wide'); // 'hello world, {}', 중괄호를 출력하려면 두 개를 연속으로 써야 합니다.
 */

function format() {
    let args = Array.from(arguments);

    if (args.length === 1) {
        if (typename(args[0]) === 'Object') {
            return formatByKey(this.wrap, args[0]);
        } else if (typename(args[0]) === 'Array') {
            return formatByIndex(this.wrap, args[0]);
        }
    } else {
        return formatByIndex(this.wrap, args);
    }
};

module.exports = format;