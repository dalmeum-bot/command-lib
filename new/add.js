const { Command } = require('command.js');

module.exports = {
    execute(intr, option=3, ...numbers) {
        intr.send('hello world')
    }
};