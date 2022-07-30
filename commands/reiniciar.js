const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('latencia')
		.setDescription('Consulta el tiempo de respuesta del bot y la API de Discord'),

	async execute(client, interaction) {

        interaction.reply(`Reiniciando...`);
        process.exit()

	}
};
