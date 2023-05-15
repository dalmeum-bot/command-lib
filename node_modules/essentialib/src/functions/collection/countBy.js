const filter = require('./filter.js');

/**
 * 객체에 `item`이 몇개 있는지 반환합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {*} item 개수를 세고자 하는 값
 * @param {Function} by 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Number} `item`의 개수
 * @example
 * _({ a: 1, b: 2, c: 1 }).countBy(e => e == 1); // 2
 * _([{x: 2}, {x: 4}, {x: 2}]).countBy(v => v.x == 2); // 2
 */

function countBy(item, by) {
    return filter.apply(this, [(v, k) => this.equalf(by(v, k), item)]).length;
};

module.exports = countBy; 