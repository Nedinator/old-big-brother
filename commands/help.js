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
            .setTitle("Help")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Config", "!config <admin/alert> <channel id>")
            .addField("History", "!history <kick/ban> <user id>")
            .addField("Alerts", "!alerts <on/off>")
            .setColor("BLURPLE")
            .setFooter("powered by Big Brother");

        message.channel.send(embed);
    }
}