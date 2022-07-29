let chatbot = require("espchatbotapi")
require('dotenv').config();
chatbot = new chatbot(process.env.chatbotToken, process.env.clientID)

module.exports = {
  name: 'messageCreate',
  async execute(interaction) {

    if (interaction.author.bot) return;

    if (interaction.channel.id === '1000691855136149554') {


      if (interaction.content.startsWith('\\')) return; // Ignora los mensajes que tengan "\\"

      chatbot.obtener(interaction.content).then(r => {

        if (r === 'Desconozco lo que me ha dicho') return;
        return interaction.reply(r);

      }).catch(err => {
        console.log(err);
        return interaction.reply({ content: "👾 Ha surgido un problema con el soporte IA, contacta con <@680189998750105711> para resolverlo lo antes posible.", ephemeral: true });
      });

    }

  },
};
