const { ActivityType } = require("discord.js");
const { version } = require('../package.json');
//const mongoose = require('mongoose');
require('dotenv').config();

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
		
		//base de datos
		/*mongoose.connect(process.env.mongo_uri, {
			useNewUrlParser: true,
    		useUnifiedTopology: true
		}).then(() => console.log('¡TutoClub conectado a MongoDB!'))*/
	}
}
