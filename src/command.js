// TODO - KakaoLink

function Commander(prefix) {
    this.prefix = prefix || '';
    this.commands = {};
};

Commander.prototype = {
    add(cmd) {
        if (typeof cmd == 'function') {
            let tmp = {};
            tmp[cmd.name] = cmd;
            cmd = tmp;
        }

        this.commands = Object.assign(this.commands, cmd);

        return this;
    },

    adds() {
        let args = Array.from(arguments);

        args.forEach(cmd => {
            this = this.add(cmd);
        });

        return this;
    },

    setDir(dirPath) {
        // NOTE - module 형식으로 명령어를 만들면 ES5문법을 사용해야 해서, 기본 인자 문법을 사용해야함
        // TODO - require()
        // path: 'botPath' + dirPath (ex. dirPath = 'commands' => 'botname/commands')
        // { filename: export function } 형식으로 this.commands에 삽입
    },

    execute(intr) {
        if (!intr.content.startsWith(this.prefix)) return null;

        let args = intr.content.slice(this.prefix.length).split(' ');
        let finded = this.commands;

        while (!(finded.constructor == Function || finded.isCmd == true)) {
            let notfound = true;

            for (let subcommand in finded) {
                if (subcommand == args[0]) {
                    notfound = false;
                    args.shift();
                    finded = finded[subcommand];
                    break;
                }
            }
            
            if (notfound) return null;
        }

        if (finded.constructor == Function)
            finded = new Command(finded);

        let optional_count = finded.types.filter(e => e().optional == false).length;
        if (args.length < optional_count) return null;

        for (let i = 0, j = 0; i < args.length; i++) {
            if (finded.types[j] == null) return null;

            let type = finded.types[j]();

            if (type != null) {
                if (!type.is(args[i])) return null;
            }
            
            if (type.variadic == false) j++;
        }

        for (let i = 0, j = 0; i < args.length; i++) {
            let type = finded.types[j]();

            if (type != null) {
                args[i] = type.getMatch(args[i]);
            }
            
            if (type.variadic == false) j++;
        }

        args = args.map(v => {
            if (Object.keys(v).length == 1) {
                return v.value;
            } else {
                return v;
            }
        });

        let applier = [];
        if (finded.types.length > 0) {
            let isVariadic = finded.types[finded.types.length - 1]().variadic == true;
            applier = args.slice(0, finded.types.length - isVariadic);
            if (isVariadic) {
                applier.push(args.slice(finded.types.length - 1));
            }
        }

        applier.splice(0, 0, intr);
        return finded.execute.apply(null, applier);
    }
}

// ---------------------------------------------------------------
function Command(execute) {
    this.isCmd = true;
    this.execute = execute;
    this.types = [];
}

Command.prototype = {
    type(args) {
        this.types = args;
        return this;
    }
}

// ---------------------------------------------------------------
// TODO - easier pattern write
// TODO - using named group
// TODO - union pattern
function Pattern(pattern) {
    this.pattern = pattern;
    this.match = {};
    this.variadic = false;
    this.optional = false;
}

Pattern.prototype = {
    setLabel(typetable) {
        this.match = typetable;
        return this;
    },

    is(tomatch) {
        return this.pattern.test(tomatch);
    },

    getMatch(tomatch) {
        let matched = tomatch.match(this.pattern);
        if (matched == null)
            throw new ReferenceError(tomatch + " has not matched with " + this.pattern)

        let groups = matched.slice(1);
        let keys = Object.keys(this.match);

        for (let i = 0; i < keys.length; i++) {
            this.match[keys[i]] = this.match[keys[i]](groups[i]);
        }
        return this.match;
    },

    many() {
        if (this.optional == true) 
            throw new Error('optional pattern cannot be variadic');
        this.variadic = true;
        return this;
    },

    option() {
        if (this.variadic == true)
            throw new Error('variadic pattern cannot be optional');
        this.optional = true;
        return this;
    }
};

// ---------------------------------------------------------------
Function.prototype.type = function() {
    return (new Command(this)).type(Array.from(arguments));
};

Function.prototype.option = function() {
    return () => this().option();
}

Function.prototype.many = function() {
    return () => this().many();
}

module.exports = {
    Prefix: prefix => new Commander(prefix),
    Pattern: Pattern,
    Function: Function,
    Type: {
        INT: () => new Pattern(/^([+-]?\d+)$/).setLabel({'value': Number}),
        FLOAT: () => new Pattern(/^(-?\d+\.\d+)$/).setLabel({'value': Number}),
        STRING: () => new Pattern(/^(\S+)$/).setLabel({'value': String}),
        MENTION: () => new Pattern(/^@(\S+)$/).setLabel({'value': String}),
        DATE: () => new Pattern(/^((\d{1,2})[./](\d{1,2}))$/).setLabel({'value': Date, 'month': Number, 'day': Number})
    }
};