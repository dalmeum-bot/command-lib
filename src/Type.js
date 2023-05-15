_ = require('essentialib');

function classify(str) {
    if (str.toLowerCase() === 'true' || str.toLowerCase() === 'false') {
        return Boolean;
    } else if (!isNaN(str)) {
        return Number;
    } else if (Date.parse(str)) {
        return Date;
    } else if (str.startsWith('/') && /\/[gim]*$/.test(str)) {
        return RegExp;
    } else if (/^[^, ]+(?:,[^, ]*)*$/.test(str)) {
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
            throw new TypeError("defaultValue (" + defaultValue + ") must be a instance of any constructor of " + constructors.map(v => v.name).join(', '));
        }
    } else {
        throw new TypeError("every arguments must be a constructor");
    }
}

check = function (constructors, value) {
    return constructors.some(f => _.typename(value) === f.name);
}
checkStr = function (value) {
    const _checkStr = function (constructors, str) {
        return constructors.some(f => {
            if ([String, Number, Boolean, RegExp, Date, Array].includes(f)) {
                return classify(str) === f
            } else {
                return new f(str) instanceof f;
            }
        });
    }

    return _checkStr(this.constructors, value);
}
cast = function (value) {
    const _cast = function (constructors, value) {
        let constructor = null;
        constructors.forEach(f => {
            if (([String, Number, Boolean, RegExp, Date, Array].includes(f) && classify(value) === f) || new f(value) instanceof f) {
                constructor = f;
                return false;
            }
        });

        return new constructor(value);
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

module.exports = T;