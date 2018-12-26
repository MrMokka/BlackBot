const Discord = require("discord.js");



module.exports.run = async(client, msg, args) => {

    const replys = [
        `Hey ${args[0]}, calm down now, no need to get cocky. Everything is fine and you don't need to worry. :D`,
        `Hey ${args[0]}, no need to get loud, don't let your girlfriend hear you. Screaming is not needed.`,
        `Hey ${args[0]}, SHUT UP YOU PIECE OF SHIT! :D`,
        `Hey ${args[0]}, SILENCE!`,
        `Hey ${args[0]}, chill out!`,
        `Hey ${args[0]}, stop being toxic!`,
        `Hey ${args[0]}, stop spamming!`,
        `Hey ${args[0]}, stop being a weeb!`,
        `Hey ${args[0]}, don't be a Philip, stop being a weeb`
    ]

    if(args[0] == null){
        return msg.reply(`You can't just calm the universe, specify a user please.`);
    }

    //msg.delete();
	msg.channel.send(replys[Math.floor(Math.random() * replys.length)]);
}

module.exports.help = {
	name: "calm"
}
