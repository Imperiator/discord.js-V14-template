const { Client, Collection } = require("discord.js");
require("dotenv").config();
const { token } = require("./helpers/constants");

const client = new Client({ intents: 67 });

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection()
client.selectMenu = new Collection();

client.login(token);


module.exports = client;
["commands", "events", "components"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

