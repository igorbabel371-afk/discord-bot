const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot działa");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serwer dziala na porcie " + PORT);
});

const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot działa jako ${client.user.tag}`);
});

client.on('messageCreate', async message => {

  if (message.content === "!produkty") {

    const embed = new EmbedBuilder()
      .setTitle("📦 Sklep")
      .setDescription("Wybierz kategorię produktów");

    const menu = new StringSelectMenuBuilder()
      .setCustomId('kategorie')
      .setPlaceholder('Wybierz kategorię')
      .addOptions([
        {
          label: 'Produkty Discord',
          value: 'discord',
        },
        {
          label: 'Streaming',
          value: 'streaming',
        },
        {
          label: 'Roblox',
          value: 'roblox',
        }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });

  }

});

client.on('interactionCreate', async interaction => {

  if (!interaction.isStringSelectMenu()) return;

  if (interaction.values[0] === "discord") {

    const embed = new EmbedBuilder()
      .setTitle("Produkty Discord")
      .setDescription(`
• Discord Nitro — **30 zł / 1 miesiąc**  
• Serwer Boosty — **25 zł / 14 boost / miesiąc**  
• Discord Members — **18 zł / 500 members**
`);

    await interaction.reply({ embeds: [embed], ephemeral: true });

  }

  if (interaction.values[0] === "streaming") {

    const embed = new EmbedBuilder()
      .setTitle("Streaming")
      .setDescription(`
• Netflix — **20 zł / 1 miesiąc**  
• Disney+ — **15 zł / 1 miesiąc**  
• HBO Max — **15 zł / 1 miesiąc**  
• Paramount+ — **18 zł / 1 miesiąc**  
• YouTube Premium — **17 zł / 1 miesiąc**
`);

    await interaction.reply({ embeds: [embed], ephemeral: true });

  }

  if (interaction.values[0] === "roblox") {

    const embed = new EmbedBuilder()
      .setTitle("Roblox")
      .setDescription(`
• case paradise **1 titan / 7 zł**  
• case paradise **5 titan / 35 zł**  
• case paradise **10 titan / 70 zł**  
• case paradise **15 titan / 100 zł**
`);

    await interaction.reply({ embeds: [embed], ephemeral: true });

  }

});

client.on("ready", () => {
  console.log(`Bot działa jako ${client.user.tag}`);
});

console.log("BOT STARTUJE");
console.log("TOKEN:", process.env.TOKEN);

client.login(process.env.TOKEN).catch(console.error);




