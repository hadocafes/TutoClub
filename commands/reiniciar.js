const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reiniciar')
		.setDescription('Reiniciar el bot y meter las últimas novedades'),

	async execute(client, interaction) {

        interaction.reply(`Reiniciando...`);
        process.exit()

	}
};
