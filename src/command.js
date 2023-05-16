_ = require('essentialib');
const T = require('./Type.js');

function CommandGroup(name) {
    this.name = name || '';
    this.commands = { '': [] };
    // idea: 배열이니까 Command에 next()를 만들어서 다음 명령어로 넘어가는 거 구현

    // this.commands = {
    //     '': [], // default command
    //     'meal': {
    //         '': [
    //             new Command([T.String], (date) => 0)
    //         ]
    //     },
    //     'math': {
    //         '': [
    //             new Command([T.String], (expr) => 0)
    //         ],
    //         'complex': {
    //             '': []
    //         }
    //     }
    // }
}

function Command(types, execute) {
    this.name = new Set([execute.name]);
    this.types = types;
    this.execute = execute;
}
// todo: aliase 문법을 어떻게 할까

CommandGroup.prototype.set = function () {
    let args = Array.from(arguments);
    args.forEach(arg => {
        if (_(arg).isOf(CommandGroup)) {
            this.commands[arg.name] = arg.commands;
        }
    });
}

// idea: 어? 이거 meal.execute(intr) 하면 '/meal (...)' 에서 ... 부분만 execute 하는거 아닌가? 그러면 병렬 명령어가 가능?
CommandGroup.prototype.execute = function (intr, dataSeparator) {
    dataSeparator ||= ' ';

    if (!('command' in intr && 'args' in intr && 'data' in intr)) return undefined;

    let args = [intr.command].concat(intr.args);
    let pointer = this.commands;

    while (_(pointer).isOf(Object)) {
        let isFound = false;

        for (let subcommand in pointer) {
            if (subcommand === args[0]) {
                isFound = true;

                args.shift();
                pointer = pointer[subcommand];
            }
        }

        if (!isFound)
            pointer = pointer[''];
    }

    pointer = pointer.find(cmd => {
        if (!cmd.name.has(args[0])) return false;
        args.shift();

        return cmd.types.every((type, i) => {
             if (type.variadic) {
                return args.slice(i).every(arg => type.checkStr(arg));
             } else {
                 return type.checkStr(args[i]);
             }
        });
    });

    if (pointer === undefined)
        return undefined;

    let sendArgs = [];
    pointer.types.forEach((type, i) => {
        if (type.variadic) {
            if (type.constructors.size === 1 && type.constructors.has(String)) {
                sendArgs.push(args.slice(i).join(dataSeparator));
            } else {
                sendArgs.push(args.slice(i).map(arg => type.cast(arg)));
            }
            return false;
        } else if (type.optional) {
            sendArgs.push(args[i] != null ? type.cast(args[i]) : type.defaultValue);
        } else {
            sendArgs.push(type.cast(args[i]));
        }
    });

    return pointer.execute.apply(intr, sendArgs);
}

function command() {
    let args = Array.from(arguments);
    args = args.map(arg => _(arg).isConstructor() ? T(arg) : arg);

    args.forEach((arg, i) => {
        if (arg.variadic && i !== args.length - 1)
            throw new SyntaxError("가변 인자는 마지막에만 올 수 있습니다.");
    });

    let group = this;
    return function (execute) {
        group.commands[''].push(new Command(args, execute));
    }
}
command.group = name => new CommandGroup(name);

CommandGroup.prototype.command = command;



module.exports = CommandGroup;