const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const flags = require('../utils/flags.json');

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Enseñar IA')
	.setType(ApplicationCommandType.Message),

	async execute(client, interaction) {
		
		const user = interaction.targetMessage;

    console.log(user)

	}
};
