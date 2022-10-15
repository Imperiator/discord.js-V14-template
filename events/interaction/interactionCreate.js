const { Interaction, Client, InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,

  /**
   *
   * @param { Interaction } interaction
   * @param { Client } client
   */

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);

      } catch (e) {
        console.error(e);
        await interaction.reply({
          content: `
                    >>> Error Code: **${e.code}**
                    Message: **${e.message}**
                    Status: **${e.status}**`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const selectMenu = client.selectMenu.get(interaction.customId);
      if (!selectMenu) return;

      try {
        await selectMenu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
