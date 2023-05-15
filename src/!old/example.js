const { Kkbot, KEvent } = require('Kkbot.js');
const { Prefix, Pattern, Function, Type } = require('Command.js');

const dalmeum = Kkbot(BotManager.getCurrentBot());
const commander = Prefix('/').setDir('commands');

dalmeum.on(KEvent.MESSAGE, (chat) => {
    let result = commander.execute(chat);
    
    if (result != null)
        chat.send(result);
});