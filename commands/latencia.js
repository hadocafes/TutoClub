const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('latencia')
		.setDescription('Mira la latencia del bot.'),
	execute(interaction) {
		interaction.reply(`🏓 Latencia: \`${client.ws.ping} ms.\``);
	},
};
