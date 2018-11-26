const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {


	msg.channel.send("pong");

}

module.exports.help = {
	name: "loggchan"
}
