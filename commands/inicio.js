const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { inicio } = require('../utils/emojis.json');

module.exports = {
	data: new SlashCommandBuilder().setName('inicio').setDescription('Comando de inicio'),
	async execute(client, interaction) {
		const inicioEmbed = new MessageEmbed()
			.setTitle('¡Bienvenido a TutoClub!')
			.setDescription(
				'TutoClub es un proyecto que comenzó como TutoDiscord, un simple canal para compartir conocimiento sobre Discord.\nAhora somos un grupo mucho más grande con un montón de cosas útiles para todo el mundo, pero sin olvidarnos de nuestro comienzo.'
			)
			.setColor('#FEE75C')
			.setThumbnail('https://cdn.discordapp.com/icons/533954846479351818/a_187fcad3e261b3da433bc1841341fbbb.gif?size=1024')
			.setImage('https://cdn.discordapp.com/attachments/940695072234688522/987721428965154886/FAQ_v5.png');

		const botonesInicio = new MessageActionRow().addComponents(
			new MessageButton().setCustomId('rules').setLabel('Reglas').setEmoji(`${inicio.seguridad}`).setStyle('PRIMARY'),
			new MessageButton().setCustomId('nuevoaqui').setLabel('¿Nuevo por aquí?').setEmoji(`${inicio.nuevo}`).setStyle('SUCCESS'),
			new MessageButton().setCustomId('opcionesinicio').setLabel('Opciones').setEmoji(`${inicio.ajustes}`).setStyle('SECONDARY')
		);

		client.channels.cache.get('990001358486781952').send({ embeds: [inicioEmbed], components: [botonesInicio] });
		await interaction.reply('Enviado a <#990001358486781952>');
	}
};
