const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { inicio, numeros } = require('../archivos/emojis.json');

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
                .setAuthor(interaction.user.username, interaction.user.avatarURL())
                .addField(`${interaction}`, `${interaction.user} es el responable`)
                .setColor('YELLOW')

            logs.send({ embeds: [eventEmbed] });

        }

        if (interaction.isButton()) {

            // Botones de inicio
            if (interaction.customId === 'rules') {

                const embedReglas = new MessageEmbed()
                    .setTitle(inicio.seguridad + ' REGLAS BÁSICAS')
                    .addFields(
                        { name: `${numeros.uno} No hagas spam ni flood.`, value: 'Es molesto ver poco texto en varias líneas o invitaciones.' },
                        { name: `${numeros.dos} El respeto es lo que más valoramos.` , value: 'Y si no lo hay... bueno, ya sabes...' },
                        { name: `${numeros.tres} Protégete mucho` , value: 'No compartas información personal, contraseñas o hagas click sobre supuestas promos.' },
                        { name: `${numeros.cuatro} Cuidado con el contenido que compartes.` , value: 'No aceptamos ningún contenido pirata o para mayores de edad.' },
                        { name: `${numeros.sorpresa}Usa el sentido común.` , value: 'Usa los canales adecuadamente, piensa varias veces antes de decir algo, sabes bien como usar esa cabeza.' },
                    )
                    .setColor('DARK_ORANGE')
                    .setFooter({ text: 'Los moderadores pueden sancionar también por motivos no definidos en estas normas básicas. Asegúrate de leer también los Términos y Directivas que se necesita cumplir en Discord.'});

                const botonesTerminos = new MessageActionRow()
                    .addComponents( 
                        new MessageButton()
                            .setLabel('Términos de servicio')
                            .setStyle('LINK')
                            .setURL('https://discord.com/terms'),

                        new MessageButton()
                            .setLabel('Directrices de comunidad')
                            .setStyle('LINK')
                            .setURL('https://discord.com/guidelines')
                    )

                interaction.reply({ embeds: [embedReglas], components: [botonesTerminos], ephemeral: true });
            }

        }

    }
}