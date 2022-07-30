const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const ShelterClient = require('botsshelter').default;
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildScheduledEvents
  ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.shelterClient = new ShelterClient(process.env.tokenShelter);

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');
const buttonsPath = path.join(__dirname, 'buttons');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

for (const file of eventsFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
  const filePath = path.join(buttonsPath, file);
  const button = require(filePath);
  client.buttons.set(button.name, button);
}

process.on('unhandledRejection', (err) => {
  client.channels.cache.get('989992326258626570').send({
    embeds: [new EmbedBuilder()
      .setTitle('ERROR')
      .setColor('RED')
      .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
    ]
  });
  console.log(err);
});

client.login(process.env.token);
