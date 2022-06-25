const { SlashCommandBuilder } = require('@discordjs/builders');
const { inspect } = require('util');
function clean(text) {
	if (typeof text === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	else return text;
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('El mejor comando de Discord')
		.addStringOption((code) => code.setName('code').setDescription('Código a evaluar').setRequired(true))
		.addStringOption((option) => option.setName('depth').setDescription('Profundidad que retornar').setRequired(false)),
	execute(client, interaction) {
		if (!['680189998750105711', '461279654158925825', '833257316135600158'].includes(interaction.user.id)) return;
		const depthTo = interaction.options.getString('depth') || '0';
		try {
			const code = interaction.options.getString('code');
			let evaled = code.includes('await') ? eval(`(async () => {${code}})()`) : eval(code);

			if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: parseInt(depthTo) });

			if (interaction.replied) interaction.followUp(`\`\`\`js\n${clean(evaled)}\`\`\``);
			else interaction.reply(`\`\`\`js\n${clean(evaled)}\`\`\``);
		} catch (err) {
			if (interaction.reply) interaction.followUp(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
			else interaction.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}
};
