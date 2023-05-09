const { Command } = require('command.js');
const bot = BotManager.getCurrentBot();

let ping = 
function (intr) {
    return "pong";
}

let add =
function (intr, )
Command('add')
    .arg(Number, n1 => Command()
        .arg(Number, n2 => Command()
            .args(Number, others => Command()
                .execute(() => n1 + n2 + others.reduce((a, b) => a + b, 0))
            )
            .execute(() => n1 + n2)
        )
        .execute(() => "인자는 2개 이상")
    )

let kick =
Command('kick')
    .arg((msg, arg) => msg.hasMention && /@\s+/.test(arg), user => Command()
        .arg()
    )


bot.on("message", (msg) => {
    
});