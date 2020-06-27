const { VoiceBroadcast } = require("discord.js")

module.exports = {
	name: '+name',
    description: 'Add new name to list that you can call without being executed.',
    args: true,
    usage: '<name>',
	execute(message, args) {
        const vocab = require('../vocab.js');
        vocab.em_case.push(args);
        message.channel.send(`${args} has been successfully added.`);
        message.channel.send(vocab.em_case);
    },
};