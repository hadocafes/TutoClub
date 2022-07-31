const path = require('node:path');
const fs = require('node:fs')
const eventsPath = path.join(__dirname, '../events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

module.exports = (client) => {
    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}