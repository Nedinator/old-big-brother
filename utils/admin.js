const Server = require("../models/server.js");

module.exports.checkAdminChannel = (message) => {
    Server.findOne({
        serverID: message.guild.id
    }, (err, doc) => {
        if (err) console.log(err);
        if (!doc) {
            return message.reply("Uh, oh, your server isnt in the database... Bot creator has been alerted.")
        } else {
            if (message.channel.id !== doc.adminChannel) {
                return false;
            } else {
                return true;
            }
        }
    })
}

module.exports.gimmeNotifChannel = (guild) => {
    Server.findOne({
        serverID: guild.id
    }, (err, res) => {
        if(err) return console.log(err);
        if(!res){
            return console.log("Server not found in database")
        }else{
            return `${res.notifChannel}`;
        }
    })
}