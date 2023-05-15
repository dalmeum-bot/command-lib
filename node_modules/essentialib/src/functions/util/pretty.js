const typename = require('./typename.js');

// TODO: cyclic object detection
function isCyclic(input) {
    const seen = new Set();

    function dfs(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        seen.add(obj);

        // FIXME: Object.entries() is not supported in KakaoTalkBot.
        return Object.entries(obj).some(([key, value]) => {
            const result = seen.has(value) ? true : isCyclic(value);
            seen.delete(result);
            return result;
        });
    }

    return dfs(input)
}

/**
 * 임의의 객체를 예쁘게 출력한 문자열을 반환합니다.
 * @param {*} obj 출력할 객체 
 * @param {Number} [maxLength=18] 한 줄의 최대 길이
 * @returns {String} `item`을 예쁘게 출력한 문자열을 반환합니다.
 * @example
 * _.pretty([1, 2, 3]); // [1, 2, 3]
 * _.pretty({a: 1, b: 2, c: 3}); // {a: 1, b: 2, c: 3}
 * _.pretty(new Set([1, 2, 3])); // Set {1, 2, 3}
 */

function pretty(obj, maxLength) {
    maxLength = maxLength || 18;    // 모바일 카카오톡에서 보내는 메시지 한 줄의 최대 길이가 18인 것 같네요?

    // if (isCyclic(item)) {
    //     throw new TypeError("cyclic object");
    // }

    let str = '';

    switch (typename(obj)) {
        case 'Number':
            str = obj.toString();
            break;
        case 'String':
            str = '"' + obj + '"';
            break;
        case 'boolean':
            str = obj ? 'true' : 'false';
            break;
        case 'null':
            str = 'null';
            break;
        case 'undefined':
            str = 'undefined';
            break;
        case 'Array':
            str = obj.map(v => pretty(v, maxLength)).join(', ');
            str = '[ ' + str + ' ]';
            break;
        case 'Object':
            for (let key in obj) {
                str += pretty(key, maxLength) + ': ' + pretty(obj[key], maxLength) + ', ';
            }
            str = '{ ' + str.slice(0, -2) + ' }';
            break;
        case 'Map':
            obj.forEach((v, k) => {
                str += pretty(k, maxLength) + ' => ' + pretty(v, maxLength) + ', ';
            });
            str = 'Map { ' + str.slice(0, -2) + ' }';
            break;
        case 'Set':
            obj.forEach(v => {
                str += pretty(v, maxLength) + ', ';
            });
            str = 'Set { ' + str.slice(0, -2) + ' }';
            break;
        case 'function':
            str = obj.toString().replace(/\n/g, '').replace(/\s+/g, ' ');
            break;
        case 'Symbol':
            str = obj.toString();
            break;
        case 'RegExp':
            str = obj.toString();
            break;
        case 'Date':
            str = obj.toJSON();
            break;
        default:
            str = obj.toString();
            break;
    }

    return str;
}

module.exports = pretty;