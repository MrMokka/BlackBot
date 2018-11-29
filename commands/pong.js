const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

	//console.log(msg.member.permissions.has("ADMINISTRATOR"));

	msg.channel.send("ping");

}

module.exports.help = {
	name: "pong"
}
