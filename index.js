//main discord setup
const Discord = require("discord.js");
const bot = new Discord.Client();
const {
    token
} = require("./token.json");

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
mongoose.connect('mongodb://localhost/bigbrother', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Server = require("./models/server.js");
const User = require("./models/user.js");

//extra utils
const adminTools = require("./utils/admin.js");

//turn on da bot
bot.on("ready", () => {
    console.log(bot.user.username + " is online and ready.");
    bot.generateInvite(['ADMINISTRATOR'])
        .then(link => console.log(`Generated link for invite ${link}.`))
        .catch(console.error);
})

//message sent event
bot.on("message", (message) => {
    if (message.author.id !== '178657593030475776') return;
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

//bot join server event
bot.on("guildCreate", (guild) => {
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
            return console.log("Server not found.");
        } else {
            //start the embed
            let embed = new Discord.MessageEmbed()
                .setTitle("Big Brother Alert: New User")
                .setDescription(`${member.user.username} - ${member.id}`)
                .setTimestamp(Date.now())
                .setFooter("Note: This bot can only detect bans in the servers its in.", bot.user.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL());
            User.findOne({
                userID: member.id
            }, (err2, userDoc) => {
                if (err2) console.log(err2);
                //since we're in the server query block, we can get data from that too
                let notifChannel = bot.channels.cache.get(serverDoc.notifChannel);
                if (!userDoc) {
                    embed.setColor("GREEN")
                    embed.addField("All good.", "User has 0 recorded bans.");
                    return notifChannel.send(embed);
                } else {
                    embed.setColor("RED");
                    if (userDoc.bans.length < 5) {
                        for (i = 0; i < userDoc.bans.length; i++) {
                            embed.addField(`Date: ${userDoc.bans[i].date}`, `Reason: ${userDoc.bans[i].reason}`)
                        }
                    } else {
                        for (i = 0; i < 5; i++) {
                            embed.addField(`Date: ${userDoc.bans[i].date}`, `Reason: ${userDoc.bans[i].reason}`)
                        }
                        embed.addField("User has more than 5 bans...", `This user has ${userDoc.bans.length} bans known by this bot.`)
                    }
                    return notifChannel.send(embed);
                }
            })
        }
    });
});

//user leave event
bot.on("guildMemberRemove", (member) => {
    //not going to use this until analytics is built in.
});

//user ban event
bot.on("guildBanAdd", async (guild, user) => {
    //Getting the date (yeah i copied and pasted this idc :) )
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = month + '\n' + day + ', ' + year;

    const fetchedAudit = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    });
    const banLog = fetchedAudit.entries.first();
    User.findOne({
        userID: user.id
    }, (err, doc) => {
        if (err) console.log(err);
        if (!doc) {
            const newUser = new User({
                username: user.username,
                userID: user.id,
                bans: [{
                    serverID: guild.id,
                    date: output,
                    reason: banLog.reason
                }]
            })
            newUser.save().catch(err => console.log(err));
        } else {
            //update bans

            let newBan = [{
                serverID: guild.id,
                date: output,
                reason: banLog.reason
            }]
            console.log(doc.bans)
            doc.bans = doc.bans.concat(newBan)
            console.log(doc.bans);
            doc.save().catch(err => console.log(err));
        }
    })
});

//user unban event
bot.on("guildBanRemove", (user) => {

});

//client login
bot.login(token)