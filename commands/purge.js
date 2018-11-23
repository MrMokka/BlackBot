const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

    let deleteCount = parseInt(args[0], 10) + 1;

    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
        return msg.reply("Please provide a number between 1 and 100 for the number of messages to delete");

    const fetched = await msg.channel.fetchMessages({limit: deleteCount});
    msg.channel.bulkDelete(fetched)
        .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`));

}

module.exports.help = {
	name: "purge"
}
