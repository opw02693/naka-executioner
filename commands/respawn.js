module.exports = {
    name: 'respawn',
    description: '',
    args: false,
    usage: '<name>',
    execute(message, args) {
        const fs = require('fs');
        const Discord = require ('discord.js');
        //const client = new Discord.Client();
        lg = require('../dead.json');
        //const guildId = message.channel.guild.id;
        let guild = message.channel.guild;
        const member = message.mentions.members.array()[0];
        //console.log(message.mentions.members.array()[0]);
        //const memId = message.mentions.users.first.id();
        //const resMem = message.mentions.users.first.id();
        role = message.guild.roles.cache.find(role => role.name === 'Dead');
        member.roles.remove(role);
        delete lg[member.user.id];

        fs.writeFile('./dead.json', JSON.stringify(lg), err => {
            if(err) throw err;
            message.channel.send(`${member} has respawned!`);
        })
        
    }
};