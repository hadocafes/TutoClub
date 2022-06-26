const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder().setName('Información').setType(2),
	execute(client, interaction) {

	}
};
