const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder().setName('Sobre él').setType(2),
	execute(client, interaction) {

	}
};
