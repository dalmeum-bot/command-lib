/**
 * 배열을 지정된 깊이만큼 평탄화 합니다.
 * @this {Array} 평탄화할 배열
 * @param {Number} depth 평탄화할 깊이
 * @returns {Array} `depth`번 평탄화된 배열
 * @example
 * _([1, [2, [3, [4]], 5]]).flattenDepth(1); // [1, 2, [3, [4]], 5]
 * _([1, [2, [3, [4]], 5]]).flattenDepth(2); // [1, 2, 3, [4], 5]
 */

function flattenDepth(depth) {
	if (depth < 0) {
		throw new Error('depth는 0보다 커야 합니다.');
	}

	let result = [];

	const _flat = (arr, depth) => {
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i]) && depth > 0) _flat(arr[i], depth - 1);
			else result.push(arr[i]);
		}
	};

	_flat(this.wrap, depth);
	return result;
};

module.exports = flattenDepth;