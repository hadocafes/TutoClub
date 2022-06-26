const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const flags = require('../utils/flags.json');
module.exports = {
	data: new ContextMenuCommandBuilder().setName('Información').setType(2),
	async execute(client, interaction) {
		const user = interaction.targetUser;
		const member = interaction.targetMember;
		const userInfoEmbed = new MessageEmbed().setAuthor({ name: `Información sobre ${member.displayName}`, iconURL: user.avatarURL() });

		let description = `${user.flags
			.toArray()
			.map((flag) => flags[flag])
			.join(' ')}`;
		let color = 'GOLD';

		if (user.bot) {
			description = '🤖' + description;
			color = 'BLURPLE';

			const data = await client.shelterClient.get(user.id);
			if (data)
				userInfoEmbed.addField(
					'Información del Bot (TutoShelter)',
					`**Dueño:** <@${data.owner}> \`${data.owner}\`\n**Prefix:** ${data.prefix}\n**Librería:** ${data.library}\n**Votos:** \`${data.votes}\``
				);
		}

		userInfoEmbed
			.setDescription(description)
			.setColor(color)
			.addField(
				'Usuario',
				`**Nombre de Usuario:** ${user.username}\n**ID:** \`${user.id}\`\n**Perfil:** ${user}\n**Creado el:** <t:${Math.floor(
					user.createdTimestamp / 1000
				)}:F> <t:${Math.floor(user.createdTimestamp / 1000)}:R>`
			)
			.setThumbnail(user.avatarURL())
			.setFooter({ text: `Se ha unido el` })
			.setTimestamp(member.joinedAt); //joinedTimestamp para DD/MM/YYYY
		//.setImage(user.fetchBannerURL())
		interaction.reply({ embeds: [userInfoEmbed], ephemeral: true }); //quita el efímero si quieres
	}
};
