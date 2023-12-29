// ready
const { ActivityType } = require('discord.js');
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity({
        name: 'you',
        type: ActivityType.Watching

    })
}