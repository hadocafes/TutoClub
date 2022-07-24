const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
const { version } = require('./package.json');
require('dotenv').config();

console.clear();
console.log(`TutoClub [Versión ${version}] \n`);

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.token);

rest
	.put(Routes.applicationGuildCommands(process.env.clientID, process.env.guildID), { body: commands })
	.then(() => console.log(`(/) Los comandos se han registrado`))
	.catch(console.error);
