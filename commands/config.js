module.exports = class config {
    constructor() {
        this.name = 'config',
            this.alias = ['c'],
            this.usage = '!config <adminchannel/notifchannel> <channel id>'
    }

    async run(bot, message, args) {
        const Discord = require("discord.js")
        const Server = require("../models/server.js");
        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        if (!args[1] || !args[2] || args[3]) return message.reply(this.usage)
        //i wanna do more channel checking so this doesnt get broken, but rn its just me

        Server.findOne({
            serverID: message.guild.id
        }, (err, doc) => {
            if (err) console.log(err);
            if (!doc) {
                return message.reply("Uh oh, that isn't supposed to happen. Kick bot and reinvite?");
            } else {
                if (args[1] === 'adminchannel') {
                    doc.adminChannel = args[2];
                    doc.save().catch(err => console.log(err));
                    return message.channel.send("Done!");
                }
                if (args[1] === 'notifchannel') {
                    doc.notifChannel = args[2];
                    doc.save().catch(err => console.log(err));
                    return message.channel.send("Done!");
                } else {
                    return message.reply(this.usage)
                }


            }
        });

    }
}