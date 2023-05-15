/**
 * 배열에 주어진 값들을 추가한 후, 배열을 반환합니다.
 * @alias append
 * @this {Array} 값들을 추가할 배열
 * @param {...*} [arguments] 추가할 값들
 * @returns {Array} `arguments`가 추가된 배열
 * @example
 * _([1, 2, 3]).push(4, 5); // [1, 2, 3, 4, 5]
 * _([1, 2, 3]).push(4, 5, 6); // [1, 2, 3, 4, 5, 6]
 */

function push() {
	let args = Array.from(arguments);
	let array = this.wrap;

	for (let i = 0; i < args.length; i++) {
		array[array.length] = args[i];
	}

	return array;
};

module.exports = push;