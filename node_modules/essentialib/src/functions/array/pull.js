/**
 * 배열에서 주어진 요소를 제거한 배열을 반환합니다.
 * @this {Array} 주어진 요소를 제거할 배열
 * @param {...*} [arguments] 제거할 요소
 * @returns {Array} 배열에서 주어진 요소를 제거한 배열
 * @example
 * _([1, 2, 3, 4, 5]).pull(2, 4); // [1, 3, 5]
 * _([1, 2, 3, 4, 5, 5, 5, 5, 5]).pull(2, 4, 5); // [1, 3]
 */

function pull() {
	let args = Array.from(arguments);
	let array = this.wrap;
	args.forEach(e => (array = array.filter(v => !this.equalf(v, e))));
	return array;
};

module.exports = pull;