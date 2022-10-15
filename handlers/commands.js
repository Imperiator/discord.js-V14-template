const {REST} = require("@discordjs/rest")
const {Routes} = require("discord.js")
const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);
const {token, clientId} = require("../helpers/constants")

//slash command handler using discord.js V14

module.exports = async (client) => {
    const rest = new REST({ version: '10' }).setToken(token)
    const table = new Ascii("Commands Loaded");
    // console.log(client);
    
    const commands = []
    //make a nested array of commands like the command file will be in ./commands/admin/ping.js
    var files = await(PG(`${process.cwd()}/commands/*/*.js`));

    files.map(async (file) => {
        const command = require(file);
        if (!command?.data.name)
          return table.addRow(file.split("/")[7], "🚨 Failed", "No Name");
    
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    
        await table.addRow(command.data.name, "✔ Success");
      });
      console.log(table.toString());
    
   
        try {
            //set dm_permission to false for every commands

            for (const command of commands) {
                command.dm_permission = false
            }
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }

    console.log("Commands loaded")

    
}