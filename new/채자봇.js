var { Command, Commander, Pattern, Function, Type } = require('command.js');
_ = require('Essential.js');

const commander = new Commander('').setcommand({
    ping: (chat) => "pong",

    do: ((chat, txt) => {
        txt = txt.join(' ');

        try {
            if (txt.includes("while") || txt.includes("for")) {
                return "ㅈㄹㄴ";
            }
            else {
                return _.pretty(eval(txt));
            }
        } catch (e) {
            return e.toString();
        }
    })
});

const bot = BotManager.getCurrentBot();
bot.on("message", (msg) => {
    let result = commander.execute(msg);
    if (msg.room.name === '닮음 공작소' && result != null) {
        msg.reply(result);
    }
});