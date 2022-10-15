const { SlashCommandBuilder, EmbedBuilder } = require( "discord.js" );
const logger = require('../../helpers/logger');
const { connection } = require('mongoose');


module.exports = {
    data: new SlashCommandBuilder()
        .setName( "status" )
        .setDescription( "Get the status of the bot" ),
    
     execute (interaction, client){
         try {
      const res = new EmbedBuilder().setColor("#0099ff")
        .setDescription(`**Client**: \`🟢 Online\` - \`${
        client.ws.ping
      }ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Database Connection**: \`${switchTo(connection.readyState)}\``);

      try {
        interaction.reply({ embeds: [res] });
      } catch (err) {
        logger.error(err, interaction);
      }
    } catch (err) {
      logger.error(err, interaction);
    }
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = "🔴 Disconnected";
      break;
    case 1:
      status = "🟢 Connected";
      break;
    case 2:
      status = "connecting";
      break;
    case 3:
      status = "disconnecting";
      break;
  }
  return status;
}