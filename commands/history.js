module.exports = class history {
    constructor() {
        this.name = 'history',
            this.alias = ['hist'],
            this.usage = '!history <ban/kick> <id>'
    }

    async run(bot, message, args) {
        const Discord = require('discord.js');
        const Server = require('../models/server.js');
        const User = require('../models/user.js');
        //ima do this in the morning
    }
}