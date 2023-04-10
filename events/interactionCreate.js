const { Events, EmbedBuilder, WebhookClient } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {

if (interaction.isChatInputCommand()) {

    const command = interaction.client.commands.get(interaction.commandName);

    const locales = {
        "en-US": "¡Ups! 😳\nSomething has gone wrong.",
        "en-GB": "¡Ups! 😳\nSomething has gone wrong.",
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1094943851216646244/LKac7OhUVmsShZRYOeTc_9GAV6zfJ1LbzdI_SRF4LVJdeP1AarVd6z1-JDYSf5y59p8j' });

        const embed = new EmbedBuilder()
            .setTitle('⚠️ Error')
            .setColor('DarkRed')
            .setDescription(`\`\`\`${error.stack}\`\`\``);

        webhookClient.send({
            embeds: [embed]
        });

        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: locales[interaction.locale] ?? '¡Ups! 😳\nAlgo ha fallado.', ephemeral: true });
        } else {
            await interaction.reply({ content: locales[interaction.locale] ?? '¡Ups! 😳\nAlgo ha fallado.', ephemeral: true })
        }
    }
}

return;

    },
};