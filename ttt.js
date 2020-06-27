const fs = require('fs');
const Discord = require ('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var died = 0;

const vocab = require('./vocab.js');
const detectors = require('./detectors.js');
const { error } = require('console');

var msg;


client.once('ready', () => {
    console.log('Ready!');
});


client.on ('message', message =>{

    let result;
    msg = message.content;
   
    new Promise ((resolve,reject) =>{
        result = detectors.ex_case(msg);
        resolve();
        if(error) reject();
    })
    .then(() => {
        result = detectors.q_case(result.msg, message, result.died);
    }, null)
    .then(() => {
        result = detectors.n_case(result.msg, message, result.died);
    }, null)
    .then(() => {
        result = detectors.em_case(result.msg, message, result.died);
    }, null);

});

client.login(token);


