// this messageCreate replies to ping
module.exports = (message) => {
  if (message.author.bot) return;

  if (message.content === "ping") {
    message.reply("Pong!");
  }
}