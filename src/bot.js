require('dotenv').config()

const express = require("express");
const app = express()
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "proron-wordpress.db.transip.me",
//   user: "proron_staging",
//   password: "Proron@MM3B"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// con.end();


app.listen(3000, () => {
  console.log("Project is running")
})

app.get("/", (req, res) => {
  res.send("Hello world");
})

const Discord = require("discord.js");
const { GatewayIntentBits, MessageEmbed } = require("discord.js");
const client = new Discord.Client({ 
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]});
client.on("messageCreate", message => {
  if (message.author.id != '1082615160365137971') {
    console.log("=======BEGIN BERICHT========");
    console.log(message)
    if (message.content === "Karim") {
      message.channel.send("Houd je kenker snavel dicht vieze kut egyptenaar")
    }
    if (message.content === "Terry") {
        message.channel.send("IK BEN TEWWY")
      }
    if (message.content === "embed") {
      let embed = new Discord.EmbedBuilder()
        .setTitle("Probleem oplossen")
        .setURL("https://staging.proron-werkkleding.nl/")
        .addField("Naam van de klant", name)
        .addField("Token van de klant", "token klant")
        .addField("Titel van het probleem", "probleem titel")
        .addField("Description van het probleem", "description titel")

      message.channel.send({ embeds: [embed] })
    }
    console.log("=======EINDE BERICHT========");

  }
})

client.login(process.env.token)
