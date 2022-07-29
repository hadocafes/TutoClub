const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
let chatbot = require("espchatbotapi");
require('dotenv').config();
chatbot = new chatbot(process.env.chatbotToken, process.env.clientID);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enseñar')
		.setDescription('Enseña que debe decir el bot en cada situación.')
        .addStringOption(dudaOption => dudaOption
            .setName('duda')
            .setDescription('Escribe la duda que quieres resolver')
            .setRequired(true)
        )
        .addStringOption(aprendizajeOption => aprendizajeOption
            .setName('respuesta')
            .setDescription('Ahora resuelve la duda')
            .setRequired(true)    
        ),

	async execute(client, interaction) {
		
        const duda = interaction.options.getString('duda');
        const respuesta = interaction.options.getString('respuesta');

        interaction.deferReply({ ephemeral: true });

        client.channels.cache.get('1000691906327613480')
            .send({ embeds: [new EmbedBuilder() 

                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.avatarURL({ dynamic: true })
                })
                .setFields({ name: duda, value: respuesta })
                .setColor(0xF5E561)

            ], components: [ new ActionRowBuilder() 
                
                .setComponents( new ButtonBuilder() 
                
                    .setCustomId('eliminar_aprendizaje')
                    .setEmoji('🗑️')
                    .setStyle(ButtonStyle.Danger),

                  new ButtonBuilder()
                    .setCustomId('modificar_aprendizaje')
                    .setEmoji('📝')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true)

                )
            
            ]});

        chatbot.enseñar(duda, respuesta).then(r => {
            interaction.editReply('🧩 Tu aportación se ha añadido correctamente.');
        }).catch(err => {
            interaction.editReply('⁉️ No pude hacer eso, contacta con <@680189998750105711> para solucionar este problema cuanto antes.');
            console.log(err);           
        });
        
	}
};
