const djsCommands = require('djs-commands');

module.exports = class history {
    constructor() {
        this.name = 'history',
            this.alias = ['hist'],
            this.usage = '!history <ban/kick> <id>'
    }

    async run(bot, message, args) {
        const {
            MessageEmbed
        } = require('discord.js');
        const Server = require('../models/server.js');
        const User = require('../models/user.js');
        //need some arg checks soon. right now, hope they just do it right.
        let member = message.guild.member(message.guild.members.cache.get(args[2]));
        Server.findOne({
            serverID: message.guild.id
        }, (err, serverDoc) => {
            if (err) console.log(err);
            if (!serverDoc) {
                return console.log("no server found!!?!?!?!?!"); //this should NOT happen lol.
            } else {
                if (message.channel.id !== serverDoc.adminChannel) return;
                if (!member) return message.reply("Sorry, the person has to be in your guild to see their history.")
                let embed = new MessageEmbed()
                    .setTitle(args[2])
                    .setThumbnail(member.user.displayAvatarURL())
                    .setFooter("Note: These are only kicks/bans recorded by Big Brother.")
                User.findOne({
                    userID: args[2]
                }, (err, userDoc) => {
                    if (err) console.log(err);
                    if (!userDoc) {
                        embed.setColor("GREEN")
                        embed.addField("All clear", "This user has 0 kicks/bans recorded by bot.")
                        return message.channel.send(embed);
                    } else {
                        embed.setColor("RED")
                        if (args[1] == 'kick') {
                            if (userDoc.kicks.length === 0) {
                                embed.addField("No kicks.", "This user has no recorded kicks, but has bans.")
                            } else if (userDoc.kicks.length < 5) {
                                for (let i = 0; i < userDoc.kicks.length; i++) {
                                    embed.addField(`Date: ${userDoc.kicks[i].date}`, `Reason: ${userDoc.kicks[i].reason}`);
                                }
                            } else {
                                for (let i = 0; i < 5; i++) {
                                    embed.addField(`Date: ${userDoc.kicks[i].date}`, `Reason: ${userDoc.kicks[i].reason}`);
                                }
                            }
                        } else if (args[1] == 'ban') {
                            if (userDoc.bans.length === 1) {
                                embed.addField('No bans found.', 'This user has no recorded bans, but has kicks.')
                            } else if (userDoc.bans.length < 5) {
                                for (let i = 0; i < userDoc.kicks.length; i++) {
                                    embed.addField(`Date: ${userDoc.bans[i + 1].date}`, `Reason: ${userDoc.bans[i + 1].reason}`);
                                }
                            } else {
                                for (let i = 0; i < 5; i++) {
                                    embed.addField(`Date: ${userDoc.bans[i + 1].date}`, `Reason: ${userDoc.bans[i + 1].reason}`);
                                }
                            }
                        } else {
                            return message.reply(this.usage)
                        }
                    }
                    return message.channel.send(embed);
                })
            }
        })
    }
}