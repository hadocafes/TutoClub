/*const fs = require('node:fs')

module.exports = (client) => {
    fs.readdirSync('./interactions').forEach((directory) => {
        const interactions = fs.readdirSync(
          `./interactions/${directory}/`
        ).filter((file) => file.endsWith(".js"));
        for (const file of interactions) {
          const interact = require(`../interactions/${directory}/${file}`);
    
          if (interact.id) {
            client.interactions.set(interact.id, interact);
          } else {
            console.log('❌ | Error al cargar las interacciones')
          }
        }
      });
      console.log(`✔️  | Interactions loaded successfully`);
}*/