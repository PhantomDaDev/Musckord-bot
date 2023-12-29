module.exports = {
  data: {
    name: "ping",
    description: "Replies with pong!",
  },

  run: ({ interaction, client, handler }) => {
    interaction.reply(`Pong! \`${client.ws.ping}ms\``);
  },
};
