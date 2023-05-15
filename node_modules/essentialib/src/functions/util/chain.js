/**
 * Essential 함수를 체이닝으로 사용할 수 있게 해주는 함수입니다.
 * @this {*} 체이닝을 시작할 대상 객체
 * @param {Function} callbackfn 체이닝 콜백 함수, 첫 번째 인자로 Essential 객체를 받습니다.
 * @returns {*} 체이닝 콜백 함수의 반환값
 * @example
 * let obj = [{a: 1}, {a: 2}, {a: 3}];
 * 
 * _(obj).chain(v =>
 *    v.map(e => e.a).filter(e => e > 1)
 * ) // [2, 3]
 * 
 * let person = [
 *   {name: 'John', age: 21},
 *   {name: 'Jane', age: 22},
 *   {name: 'Mary', age: 23},
 * ];
 * 
 * _(person).chain(v =>
 *    v.map(o => o.name).filter(n => n.startsWith('J')).head()
 * ) // 'John'
 */

function chain(callbackfn) {
    let essential = this;
    essential.chaining = true;

    let result = callbackfn(essential);
    result.chaining = false;

    return result.wrap;
}

module.exports = chain;