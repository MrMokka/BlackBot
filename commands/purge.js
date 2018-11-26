const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(client, msg, args) => {

    const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.name}.json`));

    if(data.purgePerm == null){
        data.purgePerm = "ADMINISTRATOR";
        fs.writeFile(`./settings/${msg.guild.name}.json`, JSON.stringify(data), function(err) {
            if(err) return console.log(err);
        });
    }

    if(!msg.member.permissions.has(data.purgePerm)) return msg.reply("You do not have permissions to use this command.");

    let deleteCount = parseInt(args[0], 10) + 1;

    if(!deleteCount || deleteCount < 1 || deleteCount > 50)
        return msg.reply("Please provide a number between 1 and 50 for the number of messages to delete");

    const fetched = await msg.channel.fetchMessages({limit: deleteCount});
    msg.channel.bulkDelete(fetched)
        .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`));

}

module.exports.help = {
	name: "purge"
}

//obj.table.push({id: 2, square:3}); //add some data
//json = JSON.stringify(obj); //convert it back to json
