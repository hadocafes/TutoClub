const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const ShelterClient = require('botsshelter').default;
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
client.shelterClient = new ShelterClient(process.env.tokenShelter);

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
		embeds: [new EmbedBuilder()
			.setTitle('ERROR')
			.setColor('RED')
			.setDescription(`\`\`\`js\n${err.stack}\`\`\``)
		]
	});
	console.log(err);
});

client.login(process.env.token);
