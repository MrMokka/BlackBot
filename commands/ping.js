const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

	//console.log(msg.member.permissions.has("ADMINISTRATOR"));

	msg.channel.send("pong");

}

module.exports.help = {
	name: "ping"
}
