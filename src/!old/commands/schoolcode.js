const { Prefix, Pattern, Function, Type } = require('Command.js');

module.exports = {
    type: [Type.STRING],
    execute: function (intr, schoolname) {
        let content = Utils.getWebText('https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=' + schoolname);
        
    }
}