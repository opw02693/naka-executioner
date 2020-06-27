
module.exports = {
    name: 'addtorole',
    description: '',
    args: false,
    usage: '<name> <role>',
    execute(message, args, member, roles) {
        let role = message.guild.roles.cache.find(role => role.name === args[1]);
        member.roles.add(role);
    },
};
