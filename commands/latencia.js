const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('latencia')
		.setDescription('Consulta el tiempo de respuesta del bot y la API de Discord'),

	async execute(client, interaction) {
		
		const message = await interaction.reply({ 
            content: 'Calculando...', 
            fetchReply: true 
        });

        interaction.editReply(`**API:** \`${client.ws.ping} ms.\`\n**Interacción:** \`${message.createdTimestamp - interaction.createdTimestamp} ms.\``);

	}
};
