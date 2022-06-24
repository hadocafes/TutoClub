var figlet = require('figlet');

console.log('—————————————————————————————————————————————————');
figlet('TutoClub', function(err, data) {
    if (err) {
        console.log(err)
        return;
    }
    console.log(data);
});

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('—————————————————————————————————————————————————');
    }
}