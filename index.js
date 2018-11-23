const Discord = require('discord.js');
const client = new Discord.Client();
const botConfig = require("./botConfig.json");
const fs = require("fs");

client.commands = new Discord.Collection();

//Read all files in commands folder
fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsFile = files.filter(f => f.split(".").pop() === "js");
	if(jsFile.length <= 0){
		console.log("Did not find any commands.");
		return;
	}

	jsFile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		client.commands.set(props.help.name, props);
	});
});
/*
fs.readFile('.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push({id: 2, square:3}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
}});
fs.access(`./settings/${client.guilds.name}.json`, fs.F_OK, (err) => {
	if(err){
		console.error(err)
		return
	}
});
*/
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {

	if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;

	const prefix = botConfig.prefix;
	const msgArray = msg.content.split(" ");
	const cmd = msgArray[0];
	const args = msgArray.slice(1);

	if(!(cmd.slice(0, 1) === prefix)) return;

	const cmdF = client.commands.get(cmd.slice(prefix.length));
	if(cmdF) cmdF.run(client, msg, args);
	const debugMsg = `${msg.author.tag} ran the command: '${msg.content}'`;
	console.log(debugMsg);

});

client.on('error', console.error);


const token = require("./token.json").token;
client.login(token);
