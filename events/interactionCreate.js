const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require('discord.js');
const { inicio, numeros } = require('../archivos/emojis.json');
const colorOptions = require('../archivos/colorOptions.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const logs = client.channels.cache.get('989992326258626570');

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.log(error);
			}

			const eventEmbed = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
				.setColor('YELLOW');

			logs.send({ embeds: [eventEmbed] });
		}

		if (interaction.isButton()) {
			// Botones de inicio
			if (interaction.customId === 'rules') {
				const embedReglas = new MessageEmbed()
					.setTitle(inicio.seguridad + ' REGLAS BÁSICAS')
					.addFields(
						{ name: `${numeros.uno} No hagas spam ni flood.`, value: 'Es molesto ver poco texto en varias líneas o invitaciones.' },
						{ name: `${numeros.dos} El respeto es lo que más valoramos.`, value: 'Y si no lo hay... bueno, ya sabes...' },
						{ name: `${numeros.tres} Protégete mucho`, value: 'No compartas información personal, contraseñas o hagas click sobre supuestas promos.' },
						{ name: `${numeros.cuatro} Cuidado con el contenido que compartes.`, value: 'No aceptamos ningún contenido pirata o para mayores de edad.' },
						{ name: `${numeros.sorpresa} Usa el sentido común.`, value: 'Usa los canales adecuadamente, piensa varias veces antes de decir algo, sabes bien como usar esa cabeza.'}
					)
					.setColor('DARK_ORANGE')
					.setFooter({ text: 'Los moderadores pueden sancionar también por motivos no definidos en estas normas básicas. Asegúrate de leer también los Términos y Directivas que se necesita cumplir en Discord.' });

				const botonesTerminos = new MessageActionRow().addComponents(
					new MessageButton().setLabel('Términos de servicio').setStyle('LINK').setURL('https://discord.com/terms'),

					new MessageButton().setLabel('Directrices de comunidad').setStyle('LINK').setURL('https://discord.com/guidelines')
				);

				interaction.reply({ embeds: [embedReglas], components: [botonesTerminos], ephemeral: true });
			}

			if (interaction.customId === 'opcionesinicio') {
				const opcionesEmbed = new MessageEmbed()
					.setTitle('Ajustes de miembro')
					.setDescription('Ponte guapo con las opciones que tenemos disponibles.')
					.setFooter({ text: 'Premium Settings', iconURL: 'https://cdn.discordapp.com/attachments/989989670446305330/990285996929208460/emoji.png' })
					.setColor('BLURPLE');

				const botonesAjustes = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId('colordeusuario')
						.setLabel('Color')
						//.setEmoji('')
						.setStyle('PRIMARY'),

					new MessageButton()
						.setCustomId('apodo')
						.setLabel('Apodo')
						//.setEmoji('')
						.setStyle('SECONDARY'),

					new MessageButton().setLabel('Próximamente').setStyle('SECONDARY').setCustomId('null').setDisabled(true)
				);

				interaction.reply({ embeds: [opcionesEmbed], components: [botonesAjustes], ephemeral: true });
			}

			if (interaction.customId === 'apodo') {
				const modal = new Modal().setCustomId('cambiar_apodo').setTitle('Cambiar de Apodo');

				const elegirApodo = new TextInputComponent()
					.setCustomId('eleccion_nombre')
					.setLabel('Opción Premium') //paso esto por el eslint? y
					.setPlaceholder('¿Qué nombre quieres?')
					.setStyle('SHORT');

				const elegirElApodo = new MessageActionRow().addComponents(elegirApodo);
				modal.addComponents(elegirElApodo);

				await interaction.showModal(modal);
			}

			if (interaction.customId === 'cambiar_apodo') {
				const apodoElegido = interaction.fields.getTextInputValue('eleccion_nombre');
				interaction.member.setNickname(apodoElegido);
				interaction.reply(`Tu apodo ha sido cambiado a ${apodoElegido}`);
			}

			if (interaction.customId === 'colordeusuario') {
				const opcionesEmbed = new MessageEmbed()
					.setTitle('Ajustes de miembro')
					.setDescription('Ponte guapo con las opciones que tenemos disponibles.')
					.setFooter({ text: 'Premium Settings', iconURL: 'https://cdn.discordapp.com/attachments/989989670446305330/990285996929208460/emoji.png' })
					.setColor('BLURPLE');

				const seleccionarColor = new MessageActionRow().addComponents(
					new MessageSelectMenu()
						.setCustomId('seleccionadorcolor')
						.setPlaceholder('Ningún color seleccionado')
						.addOptions(colorOptions)
				);

				interaction.reply({ embeds: [opcionesEmbed], components: [seleccionarColor], ephemeral: true });
			}
		}

		if (interaction.customId === 'seleccionadorcolor') {
			let colors = colorOptions.map(o => o.value);
			colors.forEach((color) => {
				if (interaction.member.roles.cache.has(color)) interaction.member.roles.cache.remove(color);
			});
			const role = interaction.guild.roles.cache.get(interaction.values[0]);
			interaction.member.roles
				.add(role)
				.then(() => {
					interaction.reply({ content: `¡Listo, te puse el color <@&${interaction.values[0]}>!`, ephemeral: true });
				})
				.catch((err) => console.error(err));
		}
	}
};
