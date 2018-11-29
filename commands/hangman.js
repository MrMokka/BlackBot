const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {


    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    msg.channel.send(embed);






}

module.exports.help = {
	name: "hangman"
}
