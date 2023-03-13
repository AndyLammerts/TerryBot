const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('awaiting_tasks')
		.setDescription('Een command om te testen'),

	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};