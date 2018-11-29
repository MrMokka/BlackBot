const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

    msg.channel.send(``, {
        files: [
            "./images/pingpong.jpg"
        ]
    });

}

module.exports.help = {
	name: "pingpong"
}
