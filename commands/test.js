const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Nada en especial.'),

	async execute(client, interaction) {
		
		const channel = client.channels.cache.get('1057750962099470457');
		channel.threads.create({ name: 'Post name', message: { content: 'Message content' }});

	}
};
