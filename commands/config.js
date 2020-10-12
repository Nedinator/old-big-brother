module.exports = class config {
    constructor() {
        this.name = 'config',
            this.alias = ['c'],
            this.usage = '!config <admin/alert> <channel id>'
    }

    async run(bot, message, args) {
        const Server = require("../models/server.js");
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return message.reply("to use this command, please give the bot permission to read audit logs.");
        if (!args[1]) return message.reply(this.usage);
        let channel = message.guild.channels.cache.get(args[2]);
        if (!channel) return message.reply(this.usage);

        Server.findOne({
            serverID: message.guild.id
        }, (err, doc) => {
            if (err) console.log(err);
            if (!doc) {
                return message.reply("Uh oh, that isn't supposed to happen. Let Ned know in support server.");
            } else {
                if (args[1] === 'admin') {
                    doc.adminChannel = args[2];
                    doc.save().catch(err => console.log(err));
                    return message.channel.send("Done!");
                }
                if (args[1] === 'alert') {
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