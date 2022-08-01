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
				interaction.reply({ content: '⁉️ No pude hacer eso, contacta con <@680189998750105711> para solucionar este problema cuanto antes.', ephemeral: true });
			}

			// LOGS
			client.channels.cache.get('989992326258626570')
				.send({ embeds: [ new EmbedBuilder() 
					.setAuthor({
						name: interaction.user.username,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true })
					})
					.setDescription(interaction.isContextMenuCommand() ? `Ha usado \`${interaction.commandName}\` en <@${interaction.targetId}>` : `Ha usado </${interaction.commandName}:${interaction.commandId}>`)
					.setColor('Blurple')
			]});
		}

	},

};
