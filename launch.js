const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
var AsciiTable = require('ascii-table');
var figlet = require('figlet');
const c = require('ansi-colors');
const { write } = require('node:fs');
require('dotenv').config();

console.clear()


var table = new AsciiTable()
table.setHeading(' ', 'Comandos')

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON())

	//console.log([commands])
	table.addRow(['✔', command.data.name]);
		
}

console.log(table.toString());


const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientID, process.env.guildID), { body: commands })
	.then(() => console.log('TutoClub '))
	.catch(console.error);