const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder().setName('user').setType(2),
	execute(client, interaction) {

	}
};
