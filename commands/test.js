module.exports = class test {
    constructor() {
        this.name = 'test',
            this.alias = ['test'],
            this.usage = '!test'
    }

    async run(bot, message, args) {
        const Discord = require('discord.js');
        const Server = require('../models/server.js');
        const User = require('../models/user.js');
        
    }
}