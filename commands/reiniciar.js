const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reiniciar')
		.setDescription('Reiniciar el bot y meter las últimas novedades'),

	async execute(client, interaction) {

		await interaction.reply({ content: 'Reiniciado correctamente, es posible que necesites esperar un poco para usar el bot.', ephemeral: true });
		wait(2500);
        process.exit();

	}
};
