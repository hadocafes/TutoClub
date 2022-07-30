let chatbot = require("espchatbotapi");
require('dotenv').config();
chatbot = new chatbot(process.env.chatbotToken, process.env.clientId);

module.exports = {
  name: 'eliminar_aprendizaje',

  async execute(client, interaction) {

    const duda = interaction.message.embeds[0].fields[0].name;
    const respuesta = interaction.message.embeds[0].fields[0].value;
    interaction.deferReply({ fetchReply: true, ephemeral: true });

    chatbot.borrar(duda, respuesta).then(r => {
      interaction.editReply('✅ La respuesta ha sido eliminada.');
    }).catch(err => {
      interaction.editReply('⁉️ No pude hacer eso, contacta con <@680189998750105711> para solucionar este problema cuanto antes.');
      console.log(err);
    });

    interaction.message.delete();

  }
}