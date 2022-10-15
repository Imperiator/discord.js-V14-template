const { connectMongo } = require("../../helpers/mongoose");
const {
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const { inProd } = require("../../helpers/constants");

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    await connectMongo();
    await wait();
    console.log(`${client.user.tag} is ready!`);

    if (inProd) {
      const channel = await client.guilds
        .resolve("YOUR_GUILD_ID")
        .channels.resolve("YOUR_CHANNEL_ID");
      channel.send({
        embeds: [
          new EmbedBuilder().setTitle(
            `<a:greentick:1011928028907061349> Bot Is __ONLINE__ (${client.ws.ping} ms)`
          ),
        ],
      });
    }

    setInterval(() => {
      // select a random message
      const messages = [
        "imperiator.tk",
        `${client.guilds.cache.size} servers`,
        "/help",
      ];
      const message = messages[Math.floor(Math.random() * messages.length)];
      client.user.setActivity(message, { type: ActivityType.Watching });
    }, 60000);

  },
};
