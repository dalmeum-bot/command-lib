_ = require('essentialib');
const { CommandGroup, T } = require('./Command.js');

function Room(msg) {
    this.name = msg.room.name;
    this.isGroupChat = msg.isGroupChat;
    this.isOpenChat = msg.room.isOpenChat;
    this.icon = msg.room.icon;
    this.id = msg.room.id;
}

function Member(msg) {
    this.name = msg.author.name;
    this.avatar = msg.author.avatar;
}

function Interact(msg) {
    this.content = msg.content;
    this.image = msg.image;
    this.chatLogId = msg.chatLogId;
    this.hasMention = msg.hasMention;
    this.packageName = msg.packageName;
    this.systemUserId = msg.systemUserId;
    this.room = new Room(msg);
    this.member = new Member(msg);

    this.send = (s) => msg.reply(s);
    this.sendf = function (s) {
        let args = Array.from(arguments);
        msg.reply(_(s).f(args.slice(1)));
    }
    this.markAsRead = () => msg.markAsRead();
}

function Kkbot(bot) {
    this.bot = bot;
    this.commandOption = {
        commandPrefix: '/',
        dataSeparator: ' ',
        roomPrefix: ''
    };
    this.commandGroup = new CommandGroup();
}

Kkbot.prototype.on = function (event, execute) {
    switch (event) {
        case "message":
            this.bot.addListener(event, (msg) => {
                execute(new Interact(msg));
            });
            break;
        case "command":
            this.bot.addListener(event, (msg) => {
                msg = new Interact(msg);
                if (msg.content.startsWith(this.commandOption.commandPrefix) && msg.room.name.startsWith(this.commandOption.roomPrefix)) {
                    let args = msg.content.split(this.commandOption.dataSeparator);
                    msg.command = args.shift().substring(this.commandOption.commandPrefix.length);
                    msg.args = args;
                    msg.data = args.join(this.commandOption.dataSeparator);

                    let result = this.commandGroup.execute(msg, this.commandOption.dataSeparator);
                    if (result != null)
                        msg.send(result);
                    execute(msg);
                }
            });
            break;
        case "join":
            // execute(chat, joinedMember);
            break;
        case "leave":
            // execute(chat, leavedMember);
            break;
    }
};

Kkbot.prototype.setCommandOption = function(commandPrefix, dataSeparator, roomPrefix) {
    this.commandOption.commandPrefix = commandPrefix || this.commandOption.commandPrefix;
    this.commandOption.dataSeparator = dataSeparator || this.commandOption.dataSeparator;
    this.commandOption.roomPrefix = roomPrefix || this.commandOption.roomPrefix;
}

function command() {
    this.commandGroup.command.apply(this.commandGroup, arguments);
}

command.Type = T;

Kkbot.prototype.command = function () {

}

module.exports = {
    Bot: (bot) => new Kkbot(bot),
    Interact: Interact
}