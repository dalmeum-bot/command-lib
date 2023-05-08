const { Kkbot, KEvent } = require('Kkbot.js');
const { Prefix, Pattern, Function, Type } = require('Command.js');

const dalmeum = Kkbot(BotManager.getCurrentBot());
const commander = Prefix('/').setDir('commands');

// kick: ((chat, user, reason="기본인자") => {
//     return `@${user} 를 강퇴합니다. 사유: ${reason}`;
// }).type(Type.mention, Type.string.option()),

// add: ((chat, ps) => {
//     return ps.reduce((a, b) => a + b, 0);
// }).type(Type.int.many())

dalmeum.on(KEvent.MESSAGE, (chat) => {
    let result = commander.execute(chat);
    if (result != null)
        chat.send(result);
});