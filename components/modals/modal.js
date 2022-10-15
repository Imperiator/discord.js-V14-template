

module.exports = {
  data: {
    name: "modal",
  },
   execute(interaction, client) {
    interaction.reply({
      content: `You said ${interaction.fields.getTextInputValue("textmessage")}`,
    });
    console.log(interaction)
  },
};