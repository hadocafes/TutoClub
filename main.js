const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]
}); //nop

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
fs.readdir(eventsPath, (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const evt = require(`./events/${file}`);
		const evtName = file.split('.')[0];
		client.on(evtName, evt.bind(null, client));
	});
});

process.on('unhandledRejection', (err) => {
	client.channels.cache.get('989992326258626570').send({
		embeds: [new MessageEmbed().setTitle('ERROR').setColor('RED').setDescription(`\`\`\`js\n${err}\`\`\``)]
	});
	console.log(err);
});

require('dotenv').config();
client.login(process.env.token);
