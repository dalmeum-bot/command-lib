_ = require('essentialib');

// TODO
//  - 명령어 모듈화
//  - 명령어 모듈(파일) 불러오기
//  - type alias 같은 명령어 속성

function classify(str) {
    if (str.toLowerCase() === 'true' || str.toLowerCase() === 'false') {
        return Boolean;
    } else if (!isNaN(str)) {
        return Number;
    } else if (Date.parse(str)) {
        return Date;
    } else if (str.startsWith('/') && /\/[gim]*$/.test(str)) {
        return RegExp;
    } else if (/^[^, ]+(?:,[^, ]*)+$/.test(str)) {
        return Array;
    } else {
        return String;
    }
}

function Type(constructors) {
    if (constructors.every(v => _(v).isConstructor())) {
        this.constructors = new Set(constructors);
        Object.defineProperty(this, 'optional', {
            value: false,
            writable: false
        });
        Object.defineProperty(this, 'variadic', {
            value: false,
            writable: false
        });
        Object.defineProperty(this, 'common', {
            value: !this.optional && !this.variadic,
            writable: false
        });
    } else {
        throw new TypeError(constructors + ", every arguments must be a constructor");
    }
}

function VariadicType(constructors) {
    if (constructors.every(v => _(v).isConstructor())) {
        this.constructors = new Set(constructors);
        Object.defineProperty(this, 'optional', {
            value: false,
            writable: false
        });
        Object.defineProperty(this, 'variadic', {
            value: true,
            writable: false
        });
        Object.defineProperty(this, 'common', {
            value: !this.optional && !this.variadic,
            writable: false
        });
    } else {
        throw new TypeError(constructors + ", every arguments must be a constructor");
    }
}

function OptionalType(constructors, defaultValue) {
    if (constructors.every(v => _(v).isConstructor())) {
        if (defaultValue === undefined || check(constructors, defaultValue)) {
            this.constructors = new Set(constructors);
            this.defaultValue = defaultValue;
            Object.defineProperty(this, 'optional', {
                value: true,
                writable: false
            });
            Object.defineProperty(this, 'variadic', {
                value: false,
                writable: false
            });
            Object.defineProperty(this, 'common', {
                value: !this.optional && !this.variadic,
                writable: false
            });
        } else {
            throw new TypeError("기본 인자 초깃값(값: " + defaultValue + ") 은 [" + constructors.map(v => v.name).join(', ') + "] 중 하나의 인스턴스여야 합니다.");
        }
    } else {
        throw new TypeError("모든 인자가 생성자 함수여야 합니다.");
    }
}

check = function (constructors, value) {
    return constructors.some(f => _.typename(value) === f.name);
}
checkStr = function (value) {
    const _checkStr = function (constructors, str) {
        if (this.optional && str == null)
            return true;
        else
            return _(constructors).some(f => {
                if ([String, Number, Boolean, RegExp, Date, Array].includes(f)) {
                    return classify(str) === f
                } else {
                    return new f(str) instanceof f;
                }
            });
    }

    return _checkStr.apply(this, [this.constructors, value]);
}
cast = function (value) {
    const _cast = function (constructors, value) {
        let find = null;

        constructors.forEach(constructor => {
            if ([String, Number, Boolean, RegExp, Date, Array].includes(constructor)) {
                if (classify(value) === constructor) {
                    find = constructor;
                    return false;
                }
            } else {
                if (new constructor(value) instanceof constructor) {
                    find = constructor;
                    return false;
                }
            }
        });

        return new find(value);
    }

    return _cast(this.constructors, value);
}

Type.prototype.check = function (value) {
    return check(this.constructors, value);
}
Type.prototype.checkStr = checkStr;
Type.prototype.cast = cast;

VariadicType.prototype.check = function (value) {
    return check(this.constructors, value);
}
VariadicType.prototype.checkStr = checkStr;
VariadicType.prototype.cast = cast;

OptionalType.prototype.check = function (value) {
    return check(this.constructors, value);
}
OptionalType.prototype.checkStr = checkStr;
OptionalType.prototype.cast = cast;

T = function () {
    return new Type(Array.from(arguments));
}
T.Array = T(Array);
T.String = T(String);
T.Number = T(Number);
T.Boolean = T(Boolean);
T.RegExp = T(RegExp);
T.Date = T(Date);

T.many = function () {
    return new VariadicType(Array.from(arguments));
}
T.many.Array = T.many(Array);
T.many.String = T.many(String);
T.many.Number = T.many(Number);
T.many.Boolean = T.many(Boolean);
T.many.RegExp = T.many(RegExp);
T.many.Date = T.many(Date);

T.optional = function () {
    let args = Array.from(arguments);
    return function (defaultValue) {
        return new OptionalType(args, defaultValue);
    }
}
T.optional.Array = defaultValue => T.optional(Array)(defaultValue);
T.optional.String = defaultValue => T.optional(String)(defaultValue);
T.optional.Number = defaultValue => T.optional(Number)(defaultValue);
T.optional.Boolean = defaultValue => T.optional(Boolean)(defaultValue);
T.optional.RegExp = defaultValue => T.optional(RegExp)(defaultValue);
T.optional.Date = defaultValue => T.optional(Date)(defaultValue);

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

module.exports = {
    CommandGroup: CommandGroup,
    T: T
};