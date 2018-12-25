const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async(client, msg, args) => {

    return;

    request = require('request');

    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(encodeURI(args[1]), 'google.png', function(){
        console.log('done');
    });


}

module.exports.help = {
	name: "file"
}
