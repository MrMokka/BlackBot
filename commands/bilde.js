const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

	const toSend = [
		"./images/bilder/0.png",
		"./images/bilder/1.png",
		"./images/bilder/2.png",
		"./images/bilder/3.png",
		"./images/bilder/4.png",
		"./images/bilder/5.png",
		"./images/bilder/6.png",
		"./images/bilder/7.png",
		"./images/bilder/8.png",
		"./images/bilder/9.png",
		"./images/bilder/10.png",
		"./images/bilder/11.png",
		"./images/bilder/12.png",
		"./images/bilder/13.png",
		"./images/bilder/14.png",
		"./images/bilder/15.png"
	]

	let index = -1;

	if(args[0] != null && !isNaN(args[0]))
		index = args[0]

	// Multiply with exlusive maxiumum number
	if(index == -1){
		index = Math.floor(Math.random() * toSend.length);
	}

	msg.channel.send(``, {
        files: [
            toSend[index]
        ]
    });

}

module.exports.help = {
	name: "bilde"
}
