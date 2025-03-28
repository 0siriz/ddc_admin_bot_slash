require('dotenv').config();
const Sequelize = require('sequelize');
const { Client, IntentsBitField } = require('discord.js');

const eventHandler = require('./handlers/eventHandler');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.MessageContent,
	],
});

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
})

client.models = {
	verifyMessages: sequelize.define('verifyMessages', {
		content: {
			type: Sequelize.STRING,
		},
		guildId: {
			type: Sequelize.STRING,
		},
		userId: {
			type: Sequelize.STRING,
		},
	}),
}

eventHandler(client)

client.login(process.env.TOKEN);
