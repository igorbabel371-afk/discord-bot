const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const express = require("express");

console.log("START PROGRAMU");

const app = express();

/* ===== DISCORD CLIENT ===== */

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("BOT ZALOGOWANY jako " + client.user.tag);
});

/* ===== INTERACTIONS ===== */

client.on("interactionCreate", async interaction => {

  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "cennik") {

      const menu = new StringSelectMenuBuilder()
        .setCustomId("cennik")
        .setPlaceholder("Wybierz kategorię")
        .addOptions([
          { label: "Discord", value: "discord" },
          { label: "Roblox", value: "roblox" }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.reply({
        content: "Wybierz kategorię:",
        components: [row],
        ephemeral: true
      });

    }

  }

  if (interaction.isStringSelectMenu()) {

    if (interaction.values[0] === "discord") {

      const embed = new EmbedBuilder()
        .setTitle("Discord")
        .setDescription(`
• Bot Discord **10 zł**
• Bot Discord **20 zł**
• Bot Discord **30 zł**
`);

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });

    }

    if (interaction.values[0] === "roblox") {

      const embed = new EmbedBuilder()
        .setTitle("Roblox")
        .setDescription(`
• Case Paradise **1 titan – 7 zł**
• Case Paradise **5 titan – 35 zł**
• Case Paradise **10 titan – 70 zł**
• Case Paradise **15 titan – 100 zł**
`);

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });

    }

  }

});

/* ===== LOGIN ===== */

console.log("TOKEN length:", process.env.TOKEN ? process.env.TOKEN.length : "BRAK");
console.log("TOKEN first chars:", process.env.TOKEN ? process.env.TOKEN.slice(0,5) : "BRAK");

console.log("PRÓBA LOGOWANIA");

client.login(process.env.TOKEN)
  .then(() => console.log("LOGIN OK"))
  .catch(err => console.error("LOGIN ERROR:", err));

/* ===== WEB SERVER (Render) ===== */

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Bot działa");
});

app.listen(PORT, () => {
  console.log("Serwer działa na porcie " + PORT);
});
