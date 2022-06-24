const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inicio')
		.setDescription('no uses esto'),
	execute(interaction) {

        // trabajando en eso, no me mires mal =.=

	    await interaction.reply('<#990001358486781952> porfa pls');
	},
};