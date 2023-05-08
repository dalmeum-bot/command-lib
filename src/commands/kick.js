const { Prefix, Pattern, Function, Type } = require('Command.js');
_ = require('Essential');

module.exports = (function (intr, user, reason) {
    reason ||= "기본이유";
    return _("@{}를 강퇴합니다. 사유: {}").f(user, reason);
}).type(Type.mention, Type.string.option())