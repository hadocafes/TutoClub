const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const flags = require('../utils/flags.json');

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Información')
	.setType(ApplicationCommandType.User),

	async execute(client, interaction) {
		
		const user = interaction.targetUser;
		const member = interaction.targetMember;

		let badges = `${user.flags
			.toArray()
			.map((flag) => flags[flag])
			.join(' ')}`;
		let color = 0xF5E561;

		const embed = new EmbedBuilder()
			.setAuthor({
				name: `Información sobre ${member.displayName}`,
				iconURL: user.avatarURL({ dynamic: true })
			})
			.addFields({ name: 'Usuario', value: `**Nombre de Usuario:** ${user.username}\n**ID:** \`${user.id}\`\n**Perfil:** ${user}\n**Creado el:** <t:${Math.floor(user.createdTimestamp / 1000)}:F> <t:${Math.floor(user.createdTimestamp / 1000)}:R>`});

		if (user.bot) {

			const data = await client.shelterClient.get(user.id);

			badges = '<:bot:992808295276482581> ' + badges;
			color = 'Blurple';

			if (data) {

				badges = '<:bshelter:992809801337819146> ' + badges - '<:bot:992808295276482581> ';
				color = 0x00a79d;
				embed.addFields(
					{ name: 'Sobre el bot', value: data.description },
					{ name: 'Más detalles de TutoShelter', value: `**Dueño:** <@${data.owner}> \`${data.owner}\`\n**Prefix:** ${data.prefix}\n**Librería:** ${data.library}\n**Votos:** \`${data.votes}\`` }
				);

			}
		}

		embed.setDescription(badges).setColor(color);
		interaction.reply({ embeds: [embed], ephemeral: false });

	}
};
