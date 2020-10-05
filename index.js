//main discord setup
const Discord = require("discord.js");
const bot = new Discord.Client();
const {
    token
} = require("./token.json");

//set up env variables
require('dotenv').config();
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbhost = process.env.DB_HOST;

//command handler
const {
    CommandHandler
} = require("djs-commands")
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: ['!']
});

//mongo connection stuff
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}${dbhost}/big-brother`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//
const Server = require("./models/server.js");
const User = require("./models/user.js");

//turn on da bot
bot.on("ready", () => {
    console.log(bot.user.username + " is online and ready.");
    bot.user.setActivity(`${bot.guilds.size} servers.`, {
        type: "WATCHING"
    });
    bot.generateInvite(['ADMINISTRATOR'])
        .then(link => console.log(`Generated link for invite ${link}.`))
        .catch(console.error);
})

//message sent event
bot.on("message", (message) => {
    if (message.channel.type === 'dm') return;
    if (message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if (!cmd) return;

    try {
        cmd.run(bot, message, args)
    } catch (e) {
        console.log(e)
    }
});

//Getting the date (yeah i copied and pasted this idc :) )
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
let output = month + ' ' + day + ', ' + year;

//bot join server event
bot.on("guildCreate", (guild) => {
    bot.user.setActivity(`${bot.guilds.cache.length} servers.`, {
        type: "WATCHING"
    });
    Server.findOne({
        serverID: guild.id
    }, (err, doc) => {
        if (err) console.log(err);
        if (!doc) {
            const newServer = new Server({
                serverName: guild.name,
                serverID: guild.id
            })
            newServer.save().catch(err => console.log(err));
        } else {
            return console.log("Thats weird... " + guild.name + " just added the bot but already exists in the db.")
        }
    });
});

//user join event
bot.on("guildMemberAdd", (member) => {
    Server.findOne({
        serverID: member.guild.id
    }, (err, serverDoc) => {
        if (err) console.log(err);
        if (!serverDoc) {
            const newDoc = new Server({
                serverName: member.guild.name,
                serverID: member.guild.id
            })
            newDoc.save().catch(err => console.log(err));
            return console.log("Server not found.");

        } else {
            if (!serverDoc.alerts) return;

            let embed = new Discord.MessageEmbed()
                .setTitle("Big Brother Alert: New User")
                .setDescription(`${member.user.username} - ${member.id}`)
                .setTimestamp(Date.now())
                .setFooter("Note: This bot can only detect bans/kicks in the servers its in.", bot.user.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL());
            User.findOne({
                userID: member.id
            }, (err2, userDoc) => {
                if (err2) console.log(err2);
                if (!serverDoc.notifChannel) return;
                let notifChannel = bot.channels.cache.get(serverDoc.notifChannel);
                if (!notifChannel) return;
                if (!userDoc) {
                    embed.setColor("GREEN")
                    embed.addField("All good.", "User has 0 recorded bans/kicks.");
                    return notifChannel.send(embed);
                } else {
                    embed.setColor("RED");
                    embed.addField("Bans", userDoc.bans.length - 1); //for some reason this was adding 1 extra
                    embed.addField("Kicks", userDoc.kicks.length);
                    return notifChannel.send(embed);
                }
            })
        }
    });
});

//user leave event
bot.on("guildMemberRemove", async (member) => {

    const fetchedAudit = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK'
    })
    const kickLog = fetchedAudit.entries.first() || 'No reason specified.'

    User.findOne({
        userID: member.id
    }, (err, userDoc) => {
        if (err) console.log(err);
        if (!userDoc) {
            const newDoc = new User({
                userID: member.id,
                kicks: [{
                    date: output,
                    reason: kickLog.reason
                }]
            });
            newDoc.save().catch(err => console.log(err));
        } else {
            const kickDoc = [{
                date: output,
                reason: kickLog.reason
            }]
            userDoc.kicks = userDoc.kicks.concat(kickDoc)
            userDoc.save().catch(err => console.log(err));
        }
    })
});

//user ban event
bot.on("guildBanAdd", async (guild, user) => {

    const fetchedAudit = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    });
    const banLog = fetchedAudit.entries.first() || 'No reason specified.'
    User.findOne({
        userID: user.id
    }, (err, doc) => {
        if (err) console.log(err);
        if (!doc) {
            const newUser = new User({
                userID: user.id,
                bans: [{
                    date: output,
                    reason: banLog.reason
                }]
            })
            newUser.save().catch(err => console.log(err));
        } else {
            //update bans
            const newBan = [{
                serverID: guild.id,
                date: output,
                reason: banLog.reason
            }]
            doc.bans = doc.bans.concat(newBan);
            doc.save().catch(err => console.log(err));
        }
    })
});
//client login
bot.login(token)