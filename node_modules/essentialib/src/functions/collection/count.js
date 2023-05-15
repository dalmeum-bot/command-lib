const filter = require('./filter.js');

/**
 * 배열에 `item`이 몇개 있는지 반환합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {*} item 개수를 세고자 하는 값
 * @returns {Number} `item`의 개수
 * @example
 * _([0, 1, 2, 3, 0, 1, 2, 3]).count(0); // 2
 * _('abcabc').count('a'); // 2
 * _({ a: 1, b: 2, c: 1 }).count(1); // 2
 * _(new Set([0, 1, 2, 3, 0, 1, 2, 3])).count(0); // 1
 * _(new Map([['a', 1], ['b', 2], ['c', 1]])).count(1); // 2
 */

function count(item) {
    return filter.apply(this, [e => this.equalf(e, item)]).length;
};

module.exports = count;