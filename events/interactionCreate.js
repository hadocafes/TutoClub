const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'interactionCreate',

	async execute (interaction, client) {
		if(interaction.customId != undefined) {
			const id = interaction.customId
			const interaction_ = client.interactions.get(id)
			if(interaction_) {
				try {
					interaction_.execute(client, interaction)
				} catch (e) {
					console.error(e)
					interaction.reply({ content: 'Ha ocurrido un error al ejecutar la interacción.', ephemeral: true })
				}
			}
		}
		
		if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {

			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(client, interaction);
			} catch (error) {
				console.log(error);
				interaction.reply({ content: '⁉️ No pude hacer eso, contacta con <@1023960529217269781> para solucionar este problema cuanto antes.', ephemeral: true });
			}

			// LOGS
			client.channels.cache.get('1057973491057557585')
				.send({ embeds: [ new EmbedBuilder() 
					.setAuthor({
						name: interaction.user.username,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true })
					})
					.setDescription(interaction.isContextMenuCommand() ? `Ha usado \`${interaction.commandName}\` en <@${interaction.targetId}>` : `Ha usado </${interaction.commandName}:${interaction.commandId}>`)
					.setColor('Blurple')
			]});

			return;
		}

		if (interaction.isModalSubmit()) {

			if (interaction.customId === 'cartita') {

				const inicioInput = interaction.fields.getTextInputValue('inicio_carta');
				const cartaInput = interaction.fields.getTextInputValue('texto_carta');
				const finalInput = interaction.fields.getTextInputValue('final_carta');
				const firmaInput = interaction.fields.getTextInputValue('firma_carta');

				const canal = client.channels.cache.get('1056506704986116126'); // arisito del futuro, este es el canal de cartas (si no lo cambiaste)
				
				const colores = ["#EA6868", "#BD813B", "#4A4312", "#8E8F57", "#586D53"];
				const randomIndex = Math.floor(Math.random() * (colores.length - 1) + 1);
        		const colorAleatorio = colores[randomIndex];

				const embed = new EmbedBuilder().setColor(colorAleatorio)
				let description = cartaInput;
				const strings = inicioInput + cartaInput + finalInput + firmaInput;

				if(strings.includes('http')) return interaction.reply({ content: '❌ Tu mensaje contiene enlaces y eso no se puede.', ephemeral: true });

				if(inicioInput) embed.setTitle(`💌 ` + inicioInput)
				if(finalInput) description = cartaInput + `\n\n${finalInput}`
				if(firmaInput) embed.addFields({ name: 'Firmado', value: firmaInput})

				embed.setDescription(description)
				await canal.send({embeds: [embed]});
				console.log(interaction.id)
				const thread = await canal.threads.create({
					name: 'Vídeo',
					autoArchiveDuration: 60,
					reason: 'En este hilo se subirá el vídeo',
				});
				await thread.join()
				thread.send('Cuando el vídeo esté listo lo subiremos aquí.')
				await interaction.reply({ content: '✅ Tu carta se ha enviado.\n\n¡Gracias por participar! ☺️', ephemeral: true });
			}

			return;

		}

	},

};
