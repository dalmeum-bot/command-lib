/**
 * 배열의 [start, end) 구간에서 step만큼 건너뛴 배열을 반환합니다. Python의 slice 문법과 일치합니다.
 * @this {Array | String} 원본 객체
 * @param {Number} [start=0] 시작 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
 * @param {Number} [end=length] 끝 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
 * @param {Number} [step=1] 건너뛸 간격
 * @returns {Array} 배열의 [start, end) 구간에서 step만큼 건너뛴 배열
 * @example
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(2, 8, 2); // [3, 5, 7]
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(8, 2, -2); // [9, 7, 5, 3]
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(2, 8); // [3, 4, 5, 6, 7, 8]
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(8, 2); // []
 * _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-8, -2); // [3, 4, 5, 6, 7, 8]
 */

function slice(start, end, step) {
    if (start == null || start < -this.wrap.length) start = 0;
    else if (start < 0) start = this.wrap.length + start;
    else if (start > this.wrap.length) start = this.wrap.length;

    if (end == null || end < -this.wrap.length) end = this.wrap.length;
    else if (end < 0) end = this.wrap.length + end;
    else if (end > this.wrap.length) end = this.wrap.length;

    step = step || 1;

    if (step == 0)
        throw new Error("Step cannot be 0");

    let ret = [];
    if (start > end && step < 0) {
        for (let i = start; i > end; i += step) {
            ret[ret.length] = this.wrap[i];
        }
    } else if (start < end && step > 0) {
        for (let i = start; i < end; i += step) {
            ret[ret.length] = this.wrap[i];
        }
    }

    return ret;
}

module.exports = slice;