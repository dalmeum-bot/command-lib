const { Prefix, Pattern, Function, Type } = require('Command.js');

module.exports = {
    type: [Type.INT.many()],
    execute: function (intr, numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    }
}