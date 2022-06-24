const { MessageEmbed } = require('discord.js');

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

        }

        const eventEmbed = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL())
            .addField(`${interaction}`, `${interaction.user} es el responable`)
            .setColor('YELLOW')

        logs.send({ embeds: [eventEmbed] });

    }
}