const UserProfile = require("../../schemas/UserProfile");

const dailyAmount = 100000;

module.exports = {
  run: async ({ interaction }) => {
    if (!interaction.inGuild()) {
      await interaction.reply({
        content: "This command can only be executed in a server!",
        ephemeral: true,
      });
      return;
    }

    try {
      await interaction.deferReply();

      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (!userProfile) {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          lastDailyCollected: currentDate,
          balance: dailyAmount,
        });
      } else {
        if (!userProfile.lastDailyCollected) {
          userProfile.lastDailyCollected = currentDate;
        } else {
          const lastDailyDate = new Date(userProfile.lastDailyCollected);
          lastDailyDate.setHours(0, 0, 0, 0);

          if (lastDailyDate >= currentDate) {
            await interaction.editReply("You already collected your daily coins! Come back tomorrow!");
            return;
          }
        }

        userProfile.balance += dailyAmount;
        userProfile.lastDailyCollected = currentDate;
      }

      await userProfile.save();

      await interaction.editReply(
        `${dailyAmount} was added to your balance!\nNew balance: ${userProfile.balance}`
      );
    } catch (error) {
      console.error(`Error handling /daily: ${error}`);
      await interaction.editReply("An error occurred while processing your daily coins.");
    }
  },

  data: {
    name: "daily",
    description: "Gives you an injection of coins every day",
  },
};
