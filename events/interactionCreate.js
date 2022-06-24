module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: `\`\`\`js\n${error}\`\`\``});
            }

        }

        console.log(`${interaction.name} se ha accionado.`);

    }
}