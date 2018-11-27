const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(client, msg, args) => {

    const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

    if(!msg.member.permissions.has(data.purgePerm)) return msg.reply("You do not have permissions to use this command.");

	const chan = args[0];

	msg.guild.channels.forEach(function(channel) {
		if(chan == channel.name){

			if(msg.guild.me.permissionsIn(channel).has(2048)){ //SEND_MESSAGES
				data.loggChan = channel.id;
				fs.writeFile(`./settings/${msg.guild.name}.json`, JSON.stringify(data), function(err) {
					if(err) return console.log(err);
				});
				return msg.guild.channels.get(data.loggChan).send("This is the new logging channel for this server.");;
			}
			return msg.reply("Something went wrong, maybe I dont have access to that channel?");
		}
	});

}

module.exports.help = {
	name: "loggchan"
}
