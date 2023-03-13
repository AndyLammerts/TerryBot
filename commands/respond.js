const { SlashCommandBuilder } = require('discord.js');
const mysql = require('../db/db_connection.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('respond')
		.setDescription('Een command om te testen')
		.addStringOption(option =>
			option.setName('token')
				.setDescription('The token of ur message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('response')
				.setDescription('The response you want to send')
				.setRequired(true)),
				
		async execute(interaction) {
			try {
				const token = interaction.options.getString('token')
				const response = interaction.options.getString('response')
				const query = "INSERT INTO problems (token, response) VALUES ('" + token + "', '" + response + "')";
				await mysql.queryDatabase(query, function(result) {
				// Send the reply message after the query has completed
				interaction.reply('De oplossing is verstuurd!')
				});
			} catch (err) {
				console.error(err)
				await interaction.reply('An error occurred')
			}
		}
};