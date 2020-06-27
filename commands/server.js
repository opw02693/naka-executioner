module.exports = {
	name: 'server',
	description: '',
	execute(message, args) {
		if (message.content === `${prefix}server`) {
            message.channel.send(`This server's name is: ${message.guild.name}`);
	}
    },
};