const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  CommandInteraction,
  Client,
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("emitt")
    .setDescription("Event Emitter")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  /**
   * @param {CommandInteraction} interaction
   */

  async execute(interaction) {
    try {
      if (interaction.member.id !== "479216487173980160")
        return interaction.reply({
          content: "Nah, you do not have permission to use this command.",
          ephemeral: true,
        });

      const selecMenu = new SelectMenuBuilder()
        .setCustomId("emitt-menu")
        .setOptions(
          new SelectMenuOptionBuilder({
            label: "guildMemberAdd",
            value: "guildMemberAdd",
          }),
          new SelectMenuOptionBuilder({
            label: "guildMemberRemove",
            value: "guildMemberRemove",
          }),
          new SelectMenuOptionBuilder({
            label: "guildCreate",
            value: "guildCreate",
          }),
        );

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(selecMenu)],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
