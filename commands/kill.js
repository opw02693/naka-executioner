const fs = require('fs');

module.exports = {
    name: 'kill',
    description: '',
    args: false,
    usage: '',
    execute(message, time, member, client, role) {

        //let role = message.guild.roles.cache.find(role => role.name === args[1]);
        member.roles.add(role);

        client.kills[member.id] = {
            guild : message.guild.id,
            member : member,
            time : Date.now() + parseInt(time) * 1000 ,
        }

        member.roles.add(role);

        fs.writeFile('./dead.json', JSON.stringify(client.kills, null ,4), err => {
            if(err) throw err;
            message.channel.send(`${member} has been executed due to inppropriate language use!`);
            message.channel.send(`Respawn in ${time} seconds`);
        })

        member.roles.add(role);
    },
};