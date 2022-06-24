const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { version } = require('./package.json');

console.clear()
console.log(`TutoClub [Versión ${version}] \n`)

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON())

	console.log(`✅ ${[command.data.name]} \n`)
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientID, process.env.guildID), { body: commands })
	.then(() => console.log(`Los comandos se han registrado sin problemas.`))
	.catch(console.error);