const { Prefix, Pattern, Function, Type } = require('Command.js');

/**
 * @example
 * 급식 오늘
 * 급식 내일
 * 급식 내내내일 
 * 급식 모레
 * 급식 내일모레
 * 급식 글피
 * 급식 그글피
 * 급식 그그그그글피
 * 급식 3일 후
 * 급식 -3일 후
 * 급식 3일 전
 * 급식 -3일 전
 */

module.exports = {
    name: "급식",
    type: [Type.STRING.many()],
    execute: function meal(intr, point) {
        point = point.join(' ');

        let 그제 = /^그(끄*)(?:제|저께)$/;
        let 어제 = /^어제$/;    // `어어어어어어제` 는 들어본 적이...
        let 오늘 = /^(오+)늘$/;
        let 내일 = /^(내+)일$/;
        let 모레 = /^모레$/;   // `모모모모모모레` 는 들어본 적이...
        let 글피 = /^(그*)글피$/;
        let specific = /^(-?\d+)일\s*(후|전)$/;

        let date = new Date();

        if (그제.test(point)) {
            var matched = point.match(그제);

            var minus = matched[1].length;
            date.setDate(date.getDate() - 2 - minus);
        } else if (어제.test(point)) {
            var matched = point.match(어제);

            date.setDate(date.getDate() - 1);
        } else if (오늘.test(point)) {
            var matched = point.match(오늘);

        } else if (내일.test(point)) {
            var matched = point.match(내일);

            var plus = matched[1].length;
            date.setDate(date.getDate() + plus);
        } else if (모레.test(point)) {
            var matched = point.match(모레);

            date.setDate(date.getDate() + 2);
        } else if (글피.test(point)) {
            var matched = point.match(글피);

            var plus = matched[1].length;
            date.setDate(date.getDate() + 3 + plus);
        } else if (specific.test(point)) {
            var matched = point.match(specific);

            let direction = matched[2] == '후' ? 1 : -1;
            let days = Number(matched[1]) * direction;
            date.setDate(date.getDate() + days);
        } else {
            throw new Error("잘못된 날짜 형식입니다.");
        }

        
    }
}