const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(client, msg, args) => {

    const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

    if(!msg.member.permissions.has(data.purgePerm)) return msg.reply("You do not have permissions to use this command.");

    const deleteCount = parseInt(args[0], 10) + 1;
    let target = args[1];

    if(target != null){
        target =target.replace(/[\\<>@#&!]/g, "");
    }

    if(!deleteCount || deleteCount < 1 || deleteCount > 50)
        return msg.reply("Please provide a number between 1 and 100 for the number of messages to delete");

    const fetched = await msg.channel.fetchMessages({limit: deleteCount});

    let messages = [];
/*
    msg.guild.members.forEach(member => {
        //console.log(`${member.user.id} - ${target}`);
        if(member.user.id == target){
            msg.channel.fetchMessages({limit: deleteCount})
            .then(m => {
                messages.push(m.filter(m => m.author.id = target));
                console.log(messages.length);
            })
            //.then(messages => msg.channel.bulkDelete(messages.filter(m => m.author.tag = target)))
            .catch(console.error);
            console.log(messages.length);
            msg.channel.bulkDelete(messages);
            msg.delete();
            return;
        }
    });

    return;
*/    msg.channel.bulkDelete(fetched)
        .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`));

    var chan = msg.guild.channels.get(data.loggChan);
    if(chan == null){
        return msg.reply("Logg channel not found.");
    }

    chan.send(`${deleteCount - 1} messages has been deleted by ${msg.author.username} in ${msg.channel} with !purge`);

}

module.exports.help = {
	name: "purge"
}
