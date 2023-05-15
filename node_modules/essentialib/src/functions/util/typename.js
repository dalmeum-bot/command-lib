/**
 * 객체의 타입 이름을 반환합니다.
 * @param {*} obj 타입 이름을 구할 객체
 * @returns {String} `obj`의 타입 이름
 * @example
 * _.typename(null); // 'null'
 * _.typename(undefined); // 'undefined'
 * _.typename(1); // 'number'
 * _.typename(''); // 'string'
 * _.typename(true); // 'boolean'
 * _.typename({}); // 'object'
 * _.typename([]); // 'array'
 * _.typename(new Set()); // 'set'
 * _.typename(new Map()); // 'map'
 * _.typename(new Date()); // 'date'
 * _.typename(/a/); // 'regexp'
 * _.typename(Symbol()); // 'symbol'
 * _.typename(function() {}); // 'function'
 * _.typename(new Error()); // 'error'
 */

function typename(obj) {
    if (obj === null) return 'null';
    else if (obj === undefined) return 'undefined';
    else if (typeof obj != "object") return (typeof obj)[0].toUpperCase() + (typeof obj).slice(1);

    let name = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    if (name !== "object") return name[0].toUpperCase() + name.slice(1);

    let toString = obj.constructor.toString();
    return toString.substring(9, toString.indexOf("("));
}

module.exports = typename;