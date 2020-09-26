module.exports = class help {
    constructor() {
        this.name = 'help',
            this.alias = ['h'],
            this.usage = '!help'
    }

    async run(bot, message, args) {
        const admintool = require("../utils/admin.js");
        const Discord = require('discord.js');
        const Server = require("../models/server.js");
        if (!admintool.checkAdminChannel) return;
        let embed = new Discord.MessageEmbed()
            .setTitle(this.name)
            .addField("Config", "!config <adminchannel/notifchannel> <id>")
            .addField("History", "!history <user id>")
            .addField("Alerts", "!alerts <on/off>")
            .setColor("BLURPLE")
            .setFooter("powered by Big Brother", bot.user.displayAvatarURL);

        message.channel.send(embed);
    }
}