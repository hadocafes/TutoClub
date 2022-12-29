const { Client, GatewayIntentBits, Collection } = require('discord.js');
//const ShelterClient = require('botsshelter').default;
const package = require('./package.json')

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
client.interactions = new Collection();
//client.shelterClient = new ShelterClient(process.env.tokenShelter);

//HANDLERS
require('./handlers/eventHandler.js')(client)
require('./handlers/commandHandler.js')(client)
require('./handlers/interactionHandler.js')(client)

client.login(process.env.token);

process.on('unhandledRejection', (err) => require('./utils/error.js')(err, client))