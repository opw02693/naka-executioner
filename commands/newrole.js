    module.exports = {
        name: 'newrole',
        description: '',
        args: false,
        usage: '',
        execute(message) {
        
         /*   if (message.guild.roles.cache.some(role => role.name === 'Dead')) {
            return message.channel.send('Created <Dead> role.');
          } */
        
          message.guild.roles.create({ data: { name: 'Dead', permissions: ['VIEW_CHANNEL'] } })
            .then(() => console.log('Created Dead role.'))
            .catch(console.error);
        },
    };