require('dotenv').config();
const { REST, Routes } = require('discord.js');
const getLocalCommands = require('./utils/getLocalCommands');

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		const commands = getLocalCommands();

		console.log(commands);

		console.log(`Started refreshing ${commands.length} application (/) commands`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENTID),
			{ body: commands },
		);

		console.log(data);

		console.log(`Successfully reloaded ${data.length} application (/) commands`);

	} catch (error) {
		console.error(error);
	}



})();
