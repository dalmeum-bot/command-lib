/**
 * start부터 end까지 step만큼 증가하는 배열을 반환한다.
 * @param {Number} [start=0] 시작값
 * @param {Number} end 끝값
 * @param {Number} [step=1] 증가값, 음수면 감소
 * @returns {Array} start부터 end까지 step만큼 증가하는 배열
 * @example
 * _.range(5); // [0, 1, 2, 3, 4]
 * _.range(1, 5); // [1, 2, 3, 4]
 * _.range(1, 10, 2); // [1, 3, 5, 7, 9]
 * _.range(10, 1, -2); // [10, 8, 6, 4, 2]
 */

function range(start, end, step) {
    if (end === undefined && step === undefined) {
        end = start;
        start = 0;
    }
    step = step || 1;

    // step이 0이면 무한루프에 빠짐
    if (step === 0) {
        throw new Error('step cannot be 0');
    }

    let result = [];

    if (step < 0) {
        for (let i = start; i > end; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
    }

    return result;
};

module.exports = range;