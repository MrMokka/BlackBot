const Discord = require("discord.js");

module.exports.run = async(client, msg, args) => {

	const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

    data.purgePerm = [];
    data['purgePerm'].push(8);
    data.loggChan = null;

    data.setup = true;
    fs.writeFile(`./settings/${msg.guild.id}.json`, JSON.stringify(data), function(err) {
        if(err) return console.log(err);
    });

}

module.exports.help = {
	name: "setup"
}



function setup(){

}

function update(){
    
}
