module.exports = class alerts {
    constructor() {
        this.name = 'alerts',
            this.alias = ['alert'],
            this.usage = '!alerts <on/off>'
    }

    async run(bot, message, args) {
        const Discord = require('discord.js');
        const Server = require('../models/server.js');
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let alert;
        if(args[1] === 'on'){
            alert = true;
        }else if(args[1] === 'off'){
            alert = false;
        }else{
            return message.reply(this.usage)
        }

        Server.findOne({
            serverID: message.guild.id
        }, (err, doc) => {
            if(err) console.log(err);
            if(!doc){
                console.log("Alert command executed but no data found. Creating doc now");
                const newDoc = new Server({
                    serverName: message.guild.name,
                    serverID: message.guild.id,
                    alerts:  alert
                })
                newDoc.save().catch(err => console.log(err));
            }else{
                doc.alerts = alert;
                doc.save().catch(err => console.log(err));
            }
            return message.reply('Alerts set to ' + alert);
        })


    }
}