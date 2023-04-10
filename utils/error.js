const { EmbedBuilder } = require('discord.js')

module.exports = (err, client) => {

    const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1094943851216646244/LKac7OhUVmsShZRYOeTc_9GAV6zfJ1LbzdI_SRF4LVJdeP1AarVd6z1-JDYSf5y59p8j' });

    const embed = new EmbedBuilder()
        .setTitle('⚠️ Error')
        .setColor('DarkRed')
        .setDescription(`\`\`\`${err.stack}\`\`\``);

    webhookClient.send({
        embeds: [embed]
    });

    console.log(err);
}