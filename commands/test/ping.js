const {
  SlashCommandBuilder,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),

  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({
      content: "Pong ! <a:greentick:1011928028907061349>",
    });
  },
};
