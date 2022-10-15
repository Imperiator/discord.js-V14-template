const { EmbedBuilder, Client, SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Guilds = require('../../models/Guilds');
const logger = require('../../helpers/logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Get some bot informations'),

	async execute(interaction, client) {
		try {
			const guildsNumber = client.guilds.cache.size;
			const usersNumber = client.users.cache.size;
			const channelsNumber = client.channels.cache.size;
			var totalMembersWelcomed = 0;
			var totalMembersGoodbyeed = 0;
			const totalGuilds = await Guilds.find({}).then((guilds) => {
				guilds.forEach((guild) => {
					totalMembersWelcomed += guild.stats.welcomer.total;
					totalMembersGoodbyeed += guild.stats.goodbyeer.total;
				});
			});

			const embed = new EmbedBuilder()
        .setTitle("Bot Info")
        .addFields(
          {
            name: "Total Guilds",
            value: client.guilds.cache.size + " guilds",
          },
          {
            name: "Total Users",
            value: client.users.cache.size + " users (only cached members)",
          },
          {
            name: "Total Channels",
            value: client.channels.cache.size + " channels",
          },
          {
            name: "Total Members Welcomed",
            value: totalMembersWelcomed + " members",
          },
          {
            name: "Total Members Goodbyeed",
            value: totalMembersGoodbyeed + " members",
          },
          {
            name: "Ping",
            value: client.ws.ping + " ms",
          }
        )
        .setColor("#0099ff")
        .setThumbnail("https://img.imperiator.tk/logo_rounded.png")
        .setTimestamp();

			interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (error) {
			logger.error(error);
		}
	},
};
