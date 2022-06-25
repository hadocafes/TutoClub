const { version } = require('../package.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        client.user.setPresence({
            activities: [{
                name: 'TutoDiscord',
                type: 'WATCHING'
            }],

            status: 'idle'
        });

        console.clear()
        console.log(`TutoClub [Versión ${version}] \n\n✅ ¡${client.user.username} está preparado para la acción!`)
    }
}