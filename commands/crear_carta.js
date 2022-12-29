const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carta')
		.setDescription('💌 Crea una carta navideña para alguien especial.'),

	async execute(client, interaction) {
		
        const modal = new ModalBuilder()
            .setCustomId('cartita')
            .setTitle('💌 Escribe tu carta')
            
        const inicioInput = new TextInputBuilder()
			.setCustomId('inicio_carta')
            .setLabel("Introducción")
            .setPlaceholder('Querido...')
			.setStyle(TextInputStyle.Short)
            .setRequired(false);

		const cartaInput = new TextInputBuilder()
			.setCustomId('texto_carta')
			.setLabel("Contenido de la carta")
            .setPlaceholder('Te deseo unas felices navidades...')
			.setStyle(TextInputStyle.Paragraph)
            .setMaxLength(2000)
            .setRequired(true);
            

        const finalInput = new TextInputBuilder()
			.setCustomId('final_carta')
            .setLabel("Despido")
            .setPlaceholder('Con cariño...')
			.setStyle(TextInputStyle.Short)
            .setRequired(false);

        const firmaInput = new TextInputBuilder()
			.setCustomId('firma_carta')
            .setLabel("Firma")
            .setPlaceholder('Puedes escribir cualquier nombre, si no firmas será anónimo.')
			.setStyle(TextInputStyle.Short)
            .setRequired(false);

		const uno = new ActionRowBuilder().addComponents(inicioInput);
		const dos = new ActionRowBuilder().addComponents(cartaInput);
        const tres = new ActionRowBuilder().addComponents(finalInput);
        const cuatro = new ActionRowBuilder().addComponents(firmaInput);

		modal.addComponents(uno, dos, tres, cuatro);
		await interaction.showModal(modal);

	}
};
