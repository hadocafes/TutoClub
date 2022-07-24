const { ActivityType } = require("discord.js");
const { version } = require('../package.json');

module.exports = {
	name: 'ready',

	async execute (interaction, client) {

		client.user.setPresence({
			activities: [{
				name: 'TutoDiscord',
				type: ActivityType.Watching
			}],
			status: 'idle'
		});
	
		console.clear();
		console.log(`TutoClub [Versión ${version}] \n\n✅ ¡BOT INICIADO!`);


	}
}