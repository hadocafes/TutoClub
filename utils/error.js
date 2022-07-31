const { EmbedBuilder } = require('discord.js')

module.exports = (err, client) => {
    client.channels.cache.get('989992326258626570').send({
        embeds: [new EmbedBuilder()
          .setTitle('ERROR')
          .setColor('RED')
          .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
        ]
    });
    console.log(err);
}