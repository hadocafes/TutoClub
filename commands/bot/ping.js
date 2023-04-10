const { SlashCommandBuilder, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Comando típico'),
    async execute(interaction, client) {

        const message = await interaction.reply({ 
            content: '** **', 
            fetchReply: true 
        });

        interaction.editReply(`**API:** \`${client.ws.ping} ms.\`\n**APP:** \`${message.createdTimestamp - interaction.createdTimestamp} ms.\``);

    },
};