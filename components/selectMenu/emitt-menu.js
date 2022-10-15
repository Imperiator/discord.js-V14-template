module.exports = {
  data: {
    name: "emitt-menu",
  },
  async execute(interaction, client) {
    try {
      await interaction.deferReply();

      const value = await interaction.values[0];

      switch (value) {
        case "guildMemberAdd":
          client.emit("guildMemberAdd", interaction.member);
          break;
        case "guildMemberRemove":
          client.emit("guildMemberRemove", interaction.member);
          break;
        case "guildCreate":
          client.emit("guildCreate", interaction.guild);
          break;
      }

      await interaction.editReply({
        content: `Event ${value} emitted.`,
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
