const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const flags = require('../utils/flags.json');
module.exports = {
	data: new ContextMenuCommandBuilder().setName('Información').setType(2),
	async execute(client, interaction) {
		const user = interaction.targetUser;
		const member = interaction.targetMember;
		const userInfoEmbed = new MessageEmbed().setAuthor({ name: `Información sobre ${member.displayName}`, iconURL: user.avatarURL() });

		console.log( await user.fetchFlags)

		let description = `${user.flags
			.toArray()
			.map((flag) => flags[flag])
			.join(' ')}`;
		let color = 'GOLD';

		userInfoEmbed
		.addField(
			'Usuario',
			`**Nombre de Usuario:** ${user.username}\n**ID:** \`${user.id}\`\n**Perfil:** ${user}\n**Creado el:** <t:${Math.floor(
				user.createdTimestamp / 1000
			)}:F> <t:${Math.floor(user.createdTimestamp / 1000)}:R>`
		)
		.setThumbnail(user.avatarURL())
		.setFooter({ text: `Se ha unido el` })
		.setTimestamp(member.joinedTimestamp); //joinedTimestamp para DD/MM/YYYY

		if (user.bot) {
			description = '🤖' + description;
			color = 'BLURPLE';

			const data = await client.shelterClient.get(user.id);
			
			if (data) {
				color = '#00a79d'

				userInfoEmbed
					.addField(`Información`, data.description)
					.addField(
						'Más detalles de TutoShelter',
						`**Dueño:** <@${data.owner}> \`${data.owner}\`\n**Prefix:** ${data.prefix}\n**Librería:** ${data.library}\n**Votos:** \`${data.votes}\``
					);
			}
		}
		
		userInfoEmbed
			.setDescription(description)
			.setColor(color)
		//.setImage(user.fetchBannerURL())
		interaction.reply({ embeds: [userInfoEmbed], ephemeral: false }); //quita el efímero si quieres
	}
};
