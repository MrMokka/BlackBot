const Discord = require("discord.js");


module.exports.run = async(client, msg, args) => {

    const chan = msg.guild.channels.find(channel => channel.name === "adminzone");

    if(args[0] == "leave"){
        chan.leave();
        return;
    } else if(args[0] == "save"){
        let request = require(`request`);
        let fs = require(`fs`);
        let url = encodeURI(args[1]);
        function download(url){
            request.get(url)
                .on('error', console.error)
                .pipe(fs.createWriteStream('images/meme.png'));
        }
        return msg.reply(url);
    } else {
        chan.join();
    }


    const broadcast = client.createVoiceBroadcast();
    broadcast.playFile('./music/KarmaChameleon.mp3');
    // Play "music.mp3" in all voice connections that the client is in
    for (const connection of client.voiceConnections.values()) {
        connection.playBroadcast(broadcast);
    }



}

module.exports.help = {
	name: "song"
}
