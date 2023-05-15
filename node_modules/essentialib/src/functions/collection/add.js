const typename = require('../util/typename.js');

/**
 * 객체에 `item`을 추가합니다.
 * @this {Array | String | Object | Set | Map} `item`을 추가할 객체
 * @param {*} item 추가할 값(key)
 * @param {*} [item2] 추가할 값(value)
 * @returns {Array | String | Object | Set | Map} `item`을 this에 추가한 값
 * @example
 * _([0, 1, 2]).add(3) // [0, 1, 2, 3]
 * _('abc').add('d') // 'abcd'
 * _({ a: 1 }).add('b', 2) // { a: 1, b: 2 }
 * _(new Set([0, 1, 2])).add(3) // Set { 0, 1, 2, 3 }
 * _(new Map([['a', 1]])).add('b', 2) // Map { 'a' => 1, 'b' => 2 }
 */

function add(item, item2) {
    switch (typename(this.wrap)) {
        case 'Array':
            let ret = this.wrap;
            ret[ret.length] = item;

            return ret;
        case 'String':
            return this.wrap + item;
        case 'Object':
            let obj = this.wrap;
            obj[item] = item2;

            return obj;
        case 'Set':
            let set = this.wrap;
            set.add(item);

            return set;
        case 'Map':
            let map = this.wrap;
            map.set(item, item2);

            return map;
    }
}

module.exports = add;