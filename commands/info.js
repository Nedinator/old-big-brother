module.exports = class info {
    constructor() {
        this.name = 'info',
            this.alias = ['bot'],
            this.usage = '!info'
    }

    async run(bot, message, args) {
        const {
            MessageEmbed
        } = require('discord.js');

        const embed = new MessageEmbed()
        .setTitle("Big Brother")
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor("BLURPLE")
        .setDescription("Be notified when sketchy users join your server.")
        .addField("Members being watched", bot.users.cache.size)
        .addField("Guilds being watched", bot.guilds.cache.size)
        .addField("Upvote this bot", "[Big Brother on discordbotlist.com](https://discordbotlist.com/bots/big-brother)")
        message.channel.send(embed);
        //guilds, users, 
    }
}