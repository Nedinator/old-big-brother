module.exports = class streamer {
    constructor() {
        this.name = 'streamer',
            this.alias = ['stream'],
            this.usage = '!test'
    }

    //this command is just for my friends server lol

    async run(bot, message, args) {
        const Discord = require('discord.js');
        if(message.guild.id !== '763112957504651374') return;
        let role = message.guild.roles.cache.get('765316646297796658')
        if(!role) return message.reply(' tell <@178657593030475776> to fix his code.')
        if(message.member.roles.cache.has('765316646297796658')) return message.reply(' you already have that you nerd.');
        message.member.roles.add(role);
        return message.reply("Done!");
    }
}