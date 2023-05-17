// const _ = require('essentialib');
const { Bot, Interact } = require('./Kkbot.js');
const { CommandGroup, T } = require('./Command.js');

const root = new CommandGroup();

function Username(name) {
    if (!(typeof name === 'string' && name.startsWith('@'))) {
        throw new TypeError('content must be started with @');
    }
    this.name = name.substring(1);
}

root.command(T(Username), T(Date), T.optional(String)('그냥꼬와서'))
(
    function kick(username, until, reason) {
        console.log(`${username.name} kicked until ${until} because ${reason}`);
    }
)

root.command(T.many(String))
(
    function echo(content) {
        console.log(content);
    }
)

math = root.command.group('math')

math.command(T.many.Number)
(
    function add(numbers) {
        console.log(numbers.reduce((a, b) => a + b, 0));
    }
)

root.set(math);

const dataSeparator = ' ';
const msg = {
    content: '/math add 1 2 3',
    hasMention: false,
    chatLogId: 95,
    packageName: 'com.kakao.talk',
    room: {
        name: '방이름',
        isOpenChat: false,
        id: 1234567890,
        icon: undefined
    },
    isGroupChat: false,
    author: {
        name: 'rhs',
        avatar: undefined
    },
    image: undefined
};
const intr = new Interact(msg);
let args = msg.content.split(dataSeparator);
intr.command = args.shift().substring(1);
intr.args = args;
intr.data = args.join(dataSeparator);
x = root.execute(intr, dataSeparator);
if (x != null)
    console.log(x);
