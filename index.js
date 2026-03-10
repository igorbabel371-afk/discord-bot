const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const express = require("express");
const app = express();

console.log("START PROGRAMU");

/* ===== CLIENT ===== */

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

/* ===== READY ===== */

client.once("ready", () => {
console.log("BOT ZALOGOWANY jako " + client.user.tag);
});

/* ===== ERROR LOGS ===== */

client.on("error", console.error);
client.on("warn", console.warn);

/* ===== INTERACTIONS ===== */

client.on("interactionCreate", async interaction => {

if (interaction.isChatInputCommand()) {

if (interaction.commandName === "cennik") {

const menu = new StringSelectMenuBuilder()
.setCustomId("cennik_menu")
.setPlaceholder("Wybierz kategorię")
.addOptions([
{
label: "Discord",
value: "discord"
},
{
label: "Roblox",
value: "roblox"
}
]);

const row = new ActionRowBuilder().addComponents(menu);

return interaction.reply({
content: "Wybierz kategorię:",
components: [row],
ephemeral: true
});

}

}

/* ===== MENU ===== */

if (interaction.isStringSelectMenu()) {

if (interaction.customId === "cennik_menu") {

if (interaction.values[0] === "discord") {

const embed = new EmbedBuilder()
.setTitle("Cennik Discord")
.setDescription(`
• Bot Discord **10 zł**

• Bot Discord **20 zł**

• Bot Discord **30 zł**
`);

return interaction.update({
embeds: [embed],
components: []
});

}

if (interaction.values[0] === "roblox") {

const embed = new EmbedBuilder()
.setTitle("Cennik Roblox")
.setDescription(`
• Case Paradise **1 titan – 7 zł**

• Case Paradise **5 titan – 35 zł**

• Case Paradise **10 titan – 70 zł**

• Case Paradise **15 titan – 100 zł**
`);

return interaction.update({
embeds: [embed],
components: []
});

}

}

}

});

/* ===== LOGIN ===== */

console.log("TOKEN length:", process.env.TOKEN ? process.env.TOKEN.length : "BRAK");
console.log("TOKEN first chars:", process.env.TOKEN ? process.env.TOKEN.slice(0,5) : "BRAK");

console.log("PRÓBA LOGOWANIA");

(async () => {
try {

console.log("TOKEN:", process.env.TOKEN ? "JEST" : "BRAK");
console.log("PRÓBA LOGOWANIA...");

client.login(process.env.TOKEN);

/* ===== SERVER (Render) ===== */

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
res.send("Bot działa");
});

app.listen(PORT, () => {
console.log("Serwer działa na porcie " + PORT);
});



