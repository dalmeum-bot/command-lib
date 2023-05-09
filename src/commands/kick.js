const { Prefix, Pattern, Function, Type } = require('Command.js');
_ = require('Essential');

module.exports = {
    type: [Type.MENTION, Type.STRING.option()],
    execute: function (intr, username, reason) {
        reason ||= "기본이유";
        return "@" + username + "를 강퇴합니다. 사유: " + reason;
    }
}