const Discord = require("discord.js");

module.exports = {
    setup: function(msg) {
        const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

        data.purgePerm = [];
        data['purgePerm'].push(8);
        data.loggChan = null;

        data.setup = true;

        fs.writeFile(`./settings/${msg.guild.id}.json`, JSON.stringify(data), function(err) {
            if(err) return console.log(err);
        });
    },
    update: function(msg) {

    }
};
