const fs = require('fs');
const Discord = require ('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var died = 0;
client.kills = require('./dead.json');
const resTime = 10;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const vocab = require('./vocab.js');
const detectors = require('./detectors.js');
const { error } = require('console');

var msg;


client.once('ready', () => {
    console.log('Ready!');
});

client.on('ready', () => {

    client.setInterval(() => { 
        for(let i in client.kills){
            let time = client.kills[i].time;
            let guildId = client.kills[i].guild;
            let guild = client.guilds.resolve(guildId);
            let member = guild.members.resolve(i);
            let killedRole = guild.roles.fetch(r => r.name === 'Dead');
            if(!killedRole) continue;

            if(Date.now() > time){
                let role = guild.roles.cache.find(role => role.name === 'Dead');
                //console.log(`${i} is able to respawn!`);
                //console.log(member);
                member.roles.remove(role);
                delete client.kills[i];
                delete client.kills[i];

                fs.writeFile('./dead.json', JSON.stringify(client.kills), err => {
                    if(err) throw err;
                    member.lastMessage.channel.send(`${member} has respawned!`);
                })
            }

        }
    }, 5000)
});

client.on ('message', message =>{

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    let role;

    if (message.content.startsWith(prefix)){

        

        const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;

        if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        try {
            command.execute(message, args);
        } catch (error){
            console.error(error);
            message.reply('I had a problem executing this command!! ');
        }
    }
    
    msg = message.content.replace(/[ .:;?!+*//~,-`"&|()<>{}\[\]\r\n/\\]+/, '');
    let result;

    if(!message.author.bot){

        const command1 = client.commands.get('newrole');
        command1.execute(message);
        role = message.guild.roles.cache.find(role => role.name === 'Dead');

        const member = message.channel.lastMessage.member;
        const roles = member.roles.cache;
        //message.channel.send(msg);
       
        setTimeout(() =>{
            //console.log(member);
            new Promise ((resolve, reject) =>{
                result = detectors.ex_case(msg, message, died);
                resolve();
                if(error) reject();
            })
            .then(() => {
                result = detectors.q_case(result.msg, message, result.died);
            }, null)
            .then(() => {
                result = detectors.fn_case(result.msg, message, result.died);
            }, null)
            .then(() => {
                result = detectors.n_case(result.msg, message, result.died);
            }, null) 
            .then(() => {
                result = detectors.em_case(result.msg, message, result.died);
            }, null)
            .then(() => {
                if(result.died > 0){
                    const command = client.commands.get('removeroles');
                    command.execute(member, roles);
                    //message.channel.send(`You have used appropriate language ${result.died} time(s)`);
                    return;
                }
            }, null)
            .then(() => {
                if(result.died > 0){
                    const command = client.commands.get('kill');
                    command.execute(message, resTime, member, client, role);
                    return;
                }
            }, null);
        }, 200);
    }

});

client.login(token);


