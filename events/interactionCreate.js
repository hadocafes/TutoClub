const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require('discord.js');
const ShelterClient = require('botsshelter').default;
require('dotenv').config();
const { inicio, numeros } = require('../archivos/emojis.json');
const colorOptions = require('../archivos/colorOptions.json');

const clientShelter = new ShelterClient(process.env.tokenShelter)

module.exports = async (client, interaction) => {
	const logs = client.channels.cache.get('989992326258626570');

	if (interaction.isUserContextMenu()) {

		const user = interaction.targetUser
		const member = interaction.guild.members.cache.get(user.id)
		const userCreatedAt = user.createdAt.getTime().toString().slice(0, -3)
		const userflags = user.flags.toArray();
		const nickname = member.nickname || user.username
		const userInfoEmbed = new MessageEmbed()

		const flags = {
			DISCORD_EMPLOYEE: '<:DiscordStaff:985122690044133428>',
			DISCORD_PARTNER: '<:PartneredServerOwner:985122699863011368>',
			BUGHUNTER_LEVEL_1: '<:cazaerrores:797963772270608405>',
			BUGHUNTER_LEVEL_2: '<:cazaerrores_dorado:797964484408246273>',
			HYPESQUAD_EVENTS: '<:hype_squad_event:910263643680165908>',
			HOUSE_BRAVERY: '<:house_of_bravery:910263643625644122>',
			HOUSE_BRILLIANCE: '<:house_of_brillance:910263643793408010>',
			HOUSE_BALANCE: '<:house_of_balance:910263643625631784>',
			EARLY_SUPPORTER: '<:partidario_inicial:797964507355021392>',
			TEAM_USER: '<:PMD:848275257978388497>',
			SYSTEM: 'System',
			VERIFIED_BOT: '<:discord_verified_BOT1_from_VEGA:985129233040932875><:discord_verified_BOT2_from_VEGA:985129282789597194>',
			VERIFIED_DEVELOPER: '<:EarlyVerifiedBotDeveloper:985122692275519538>'
		};

		userInfoEmbed.setAuthor({ name: `Información sobre ${nickname}`, iconURL: user.avatarURL() })

		if (user.bot) {

			userInfoEmbed
				.setDescription('🤖' + ` ${userflags.map(flag => flags[flag]).join(' ')}`)
				.setColor('BLURPLE')

				const data = await clientShelter.get(user.id)
				
				if (data) {

				userInfoEmbed
					.addField('Información del Bot (TutoShelter)', `**Dueño:** <@${data.owner}> \`${data.owner}\`\n**Prefix:** <@${data.prefix}>\n**Librería:** ${data.library}\n**Votos:** \`${data.votes}\``)

				}

		} else {

			userInfoEmbed
			.setDescription(`${userflags.map(flag => flags[flag]).join(' ')}`)
			.setColor('GOLD')

		}

		userInfoEmbed
			.addFields([{name: 'Usuario', value: `**Nombre de Usuario:** ${user.username}\n**ID:** \`${user.id}\`\n**Perfil:** ${user}\n**Creado el:** <t:${userCreatedAt}:F> <t:${userCreatedAt}:R>`}])
			.setThumbnail(user.avatarURL())
			.setFooter({ text: `Se ha unido el`})
			.setTimestamp(member.joinedAt)
			//.setImage(user.fetchBannerURL())
			console.log(userflags.map(flag => flags[flag]).join(', '))
		interaction.reply({ embeds: [userInfoEmbed] })

	}

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.log(error);
		}

		const eventEmbed = new MessageEmbed()
			.setAuthor({
				name: `Comando usado por ${interaction.user.username}: ${interaction}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true })
			})
			.setColor('YELLOW');

		logs.send({ embeds: [eventEmbed] });
	}

	if (interaction.isButton()) {
		// Botones de inicio
		if (interaction.customId === 'rules') {
			const embedReglas = new MessageEmbed()
				.setTitle(inicio.seguridad + ' **__Reglas**__')
				.addFields(
					{
						name: `${numeros.uno} No hagas spam ni flood.`,
						value: 'Es molesto ver poco texto en varias líneas o invitaciones.'
					},
					{
						name: `${numeros.dos} El respeto es lo que más valoramos.`,
						value: 'Y si no lo hay... bueno, ya sabes...'
					},
					{
						name: `${numeros.tres} Protégete mucho`,
						value: 'No compartas información personal, contraseñas o hagas click sobre supuestas promos.'
					},
					{
						name: `${numeros.cuatro} Cuidado con el contenido que compartes.`,
						value: 'No aceptamos ningún contenido pirata o para mayores de edad.'
					},
					{
						name: `${numeros.sorpresa} Usa el sentido común.`,
						value: 'Usa los canales adecuadamente, piensa bien antes de decir algo, sabes cómo usar esa cabeza.'
					}
				)
				.setColor('DARK_ORANGE')
				.setFooter({
					text: 'Los moderadores pueden sancionar también por motivos no definidos en estas normas básicas. Asegúrate de leer también los Términos y Directivas que se necesitan cumplir en Discord.'
				});

			const botonesTerminos = new MessageActionRow().addComponents(
				new MessageButton().setLabel('Términos de servicio').setStyle('LINK').setURL('https://discord.com/terms'),
				new MessageButton().setLabel('Directrices de comunidad').setStyle('LINK').setURL('https://discord.com/guidelines')
			);

			interaction.reply({
				embeds: [embedReglas],
				components: [botonesTerminos],
				ephemeral: true
			});
		}

		if (interaction.customId === 'opcionesinicio') {
			const opcionesEmbed = new MessageEmbed()
				.setTitle('Ajustes de miembro')
				.setDescription('Ponte guapo con las opciones que tenemos disponibles.')
				.setFooter({
					text: 'Premium Settings',
					iconURL: 'https://cdn.discordapp.com/attachments/989989670446305330/990285996929208460/emoji.png'
				})
				.setColor('BLURPLE');

			const botonesAjustes = new MessageActionRow().addComponents(
				new MessageButton().setCustomId('colordeusuario').setLabel('Color').setStyle('PRIMARY'),
				new MessageButton().setCustomId('apodo').setLabel('Apodo').setStyle('SECONDARY'),
				new MessageButton().setLabel('Próximamente').setStyle('SECONDARY').setCustomId('null').setDisabled(true)
			);

			interaction.reply({
				embeds: [opcionesEmbed],
				components: [botonesAjustes],
				ephemeral: true
			});
		}

		if (interaction.customId === 'apodo') {
			const modal = new Modal().setCustomId('cambiar_apodo').setTitle('Cambiar de Apodo');

			const elegirApodo = new TextInputComponent().setCustomId('eleccion_nombre').setLabel('Opción Premium').setPlaceholder('¿Qué nombre quieres?').setStyle('SHORT');

			const elegirElApodo = new MessageActionRow().addComponents(elegirApodo);
			modal.addComponents(elegirElApodo);

			await interaction.showModal(modal);
		}

		if (interaction.customId === 'colordeusuario') {
			const opcionesEmbed = new MessageEmbed()
				.setTitle('Ajustes de miembro')
				.setDescription('Ponte guapo con las opciones que tenemos disponibles.')
				.setFooter({
					text: 'Premium Settings',
					iconURL: 'https://cdn.discordapp.com/attachments/989989670446305330/990285996929208460/emoji.png'
				})
				.setColor('BLURPLE');

			const seleccionarColor = new MessageActionRow().addComponents(
				new MessageSelectMenu().setCustomId('seleccionadorcolor').setPlaceholder('Ningún color seleccionado').addOptions(colorOptions)
			);

			interaction.reply({
				embeds: [opcionesEmbed],
				components: [seleccionarColor],
				ephemeral: true
			});
		}
	}

	if (interaction.customId === 'cambiar_apodo') {
		const apodoElegido = interaction.fields.getTextInputValue('eleccion_nombre');
		interaction.member
			.setNickname(apodoElegido)
			.then(() => {
				interaction.reply({ content: `¡Te hemos cambiado el apodo a **${apodoElegido}**!`, ephemeral: true });
			})
			.catch((err) => {
				return interaction.reply({ content: `Ocurrió un error ejecutando ese comando: \`${err.message}\``, ephemeral: true });
			});
	}

	if (interaction.customId === 'seleccionadorcolor') {
		const colors = colorOptions.map((o) => o.value);
		colors.forEach((color) => {
			if (interaction.member.roles.cache.has(color)) interaction.member.roles.remove(color);
		});
		const role = interaction.guild.roles.cache.get(interaction.values[0]);
		interaction.member.roles
			.add(role)
			.then(() => {
				interaction.reply({
					content: `¡Listo, te puse el color <@&${interaction.values[0]}>!`,
					ephemeral: true
				});
			})
			.catch((err) => console.error(err));
	}
};
