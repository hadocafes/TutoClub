const path = require('node:path');
const fs = require('node:fs')
const buttonsPath = path.join(__dirname, '../buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));


module.exports = (client) => {
    for (const file of buttonFiles) {
        const filePath = path.join(buttonsPath, file);
        const button = require(filePath);
        client.buttons.set(button.name, button);
    }
}