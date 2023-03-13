require('dotenv').config()

const fs = require('node:fs');
const path = require('node:path');
var mysql = require('mysql');
const express = require("express");
const Discord = require("discord.js");
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js");


const app = express()

const client = new Discord.Client({ 
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]});

client.commands = new Collection();

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

  
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//Wat er gebeurt als er een bericht in de chat gestuurd wordt. Eerst kijken we of het van de bot komt, daarna of het een command is.
client.on("messageCreate", message => {
  if (message.author.id != '1082615160365137971') {
    console.log("=======BEGIN BERICHT========");
    console.log(message)
  
    if (message.content.toLowerCase().includes("brave terry")) {
      message.channel.send("DANKUWEL");
    }
    if (message.content === "embed") {
      let embed = new EmbedBuilder()
        .setTitle("Probleem oplossen")
        .setURL("https://staging.proron-werkkleding.nl/")
        .addFields(
          {name: "Naam van de klant", value: 'test'},
          {name: "Token van de klant", value: "token klant"},
          {name: "Titel van het probleem", value: "probleem titel"},
          {name: "Description van het probleem", value: "description titel"},
          )
      message.channel.send({ embeds: [embed] })
    }

    console.log("=======EINDE BERICHT========");
  }
})

client.login(process.env.token)

app.listen(3000, () => {
  console.log("Terry bot is actief.")
})
