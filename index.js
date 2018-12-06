const Discord = require('discord.js');
const client = new Discord.Client();
const botConfig = require("./botConfig.json");
const fs = require("fs");
const setup = require("./settings/setup.js");

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
		const props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		client.commands.set(props.help.name, props);
	});
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("MrMokka creating a bot :D", {type: "WATCHING"});
	client.guilds.forEach(guild => {
		fs.access(`./settings/${guild.id}.json`, fs.F_OK, (err) => {
			if(err){
				let info = {
					"setup": false
				}
				let data = JSON.stringify(info);
				fs.writeFileSync(`./settings/${guild.id}.json`, data);
				return
			}
		});
	});
});

client.on('message', async (msg) => {

	if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;
	const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

	const prefix = botConfig.prefix;
	const msgArray = msg.content.split(" ");
	const cmd = msgArray[0];
	const args = msgArray.slice(1);

	if(!(cmd.slice(0, 1) === prefix)) return;

	if(cmd == "!session" && msg.member.permissions.has(data.purgePerm)){
		if(msg.member.user.tag === "MrMokka#0917"){
			if(isNaN(args[0])){
				return msg.reply("A number is missing.");
			}
			sessionSet(args[0]);
			return msg.reply("Session number has been changed.");
		}
		return msg.reply("You do not have access to this command.");
	}

	if(!sessionCheck()){
		return;
	}


	if(data.setup === false && cmd != "!setup"){ //ask to run setup if setup is not done, or server reset
		return msg.reply("Setup is not complete, please run the setup command (!setup)");
	}

	if(cmd == "!setup"){
		setup.setup(msg);
		return;
	}

	const cmdF = client.commands.get(cmd.slice(prefix.length));
	if(cmdF) cmdF.run(client, msg, args);
	const debugMsg = `${msg.author.tag} ran the command: '${msg.content}'`;
	console.log(debugMsg);

});

client.on('messageDelete', async (msg) => {

	if(!sessionCheck()){
		return;
	}

	const entry = await msg.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
	const data = JSON.parse(fs.readFileSync(`./settings/${msg.guild.id}.json`));

	let user = "";

	if (entry.extra.channel.id === msg.channel.id
	&& (entry.target.id === msg.author.id)
	&& (entry.createdTimestamp > (Date.now() - 5000))
	&& (entry.extra.count >= 1)) {
		user = entry.executor.username;
	} else {
		user = msg.author.username;
	}

	msg.guild.channels.get(data.loggChan).send(`A message was deleted in ${msg.channel.name}
	Deleted by: ${user}
	Written by: ${msg.author}
	Message: ${msg}`);
});

client.on('error', console.error);


const token = require("./token.json").token;
client.login(token);


function sessionCheck(){
	const session = JSON.parse(fs.readFileSync(`./session.json`));
<<<<<<< HEAD
	if(session.id == 10){
=======
	if(session.id == 3){
>>>>>>> f872959c97fb948d94adda0d4cfa4341c7e9ea03
		return true;
	}
	return false;
}

function sessionSet(number){
	const session = JSON.parse(fs.readFileSync(`./session.json`));
	session.id = number;
	fs.writeFile(`./session.json`, JSON.stringify(session), function(err) { if(err) return console.log(err); });
}
