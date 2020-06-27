module.exports = {
    name: 'removeroles',
    description: '',
    args: false,
    usage: '<name> <role>',
    execute(member, roles) {
        member.roles.remove(roles);
    },
};
