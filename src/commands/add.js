const { Prefix, Pattern, Function, Type } = require('Command.js');

module.exports = (function (intr, numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}).type(Type.int.many())