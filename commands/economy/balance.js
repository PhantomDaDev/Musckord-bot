const { ApplicationCommandOptionType } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  run: async ({ interaction }) => {
    if (!interaction.guild) {
      await interaction.reply({
        content: "You can only run this command inside a server",
        ephemeral: true,
      });
      return;
    }

    const targetUserId = interaction.options.getUser("target-user") || interaction.user;

    await interaction.deferReply();

    try {
      let userProfile = await UserProfile.findOneAndUpdate(
        { userId: targetUserId.id },
        {},
        { upsert: true, new: true }
      );

      interaction.editReply(
        targetUserId.id === interaction.user.id
          ? `Your balance is ${userProfile.balance}`
          : `${targetUserId.toString()} balance is ${userProfile.balance}`
      );
    } catch (error) {
      console.error(`Error handling /balance: ${error}`);
      interaction.editReply("An error occurred while fetching the balance.");
    }
  },
  data: {
    name: "balance",
    description: "Check your balance",
    options: [
      {
        name: "target-user",
        description: "The user whose balance you want to see",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
};
