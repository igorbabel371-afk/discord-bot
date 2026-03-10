console.log("TOKEN length:", process.env.TOKEN ? process.env.TOKEN.length : "BRAK");
console.log("TOKEN first chars:", process.env.TOKEN ? process.env.TOKEN.slice(0, 5) : "BRAK");

console.log("PRÓBA LOGOWANIA");
client.login(process.env.TOKEN)
  .then(() => console.log("LOGIN OK"))
  .catch(err => console.error("LOGIN ERROR:", err));

const {
Client,
GatewayIntentBits,
ActionRowBuilder,
StringSelectMenuBuilder,
EmbedBuilder
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

client.once("ready", () => {
console.log(`Bot działa jako ${client.user.tag}`);
});

client.on("messageCreate", async message => {

if (message.author.bot) return;

if (message.content === "!produkty") {

const embed = new EmbedBuilder()
.setTitle("📦 Sklep")
.setDescription("Wybierz kategorię produktów");

const menu = new StringSelectMenuBuilder()
.setCustomId("kategorie")
.setPlaceholder("Wybierz kategorię")
.addOptions([
{
label: "Produkty Discord",
value: "discord"
},
{
label: "Streaming",
value: "streaming"
},
{
label: "Roblox",
value: "roblox"
}
]);

const row = new ActionRowBuilder().addComponents(menu);

await message.channel.send({
embeds: [embed],
components: [row]
});

}

});

client.on("interactionCreate", async interaction => {

if (!interaction.isStringSelectMenu()) return;
if (interaction.customId !== "kategorie") return;

if (interaction.values[0] === "discord") {

const embed = new EmbedBuilder()
.setTitle("Produkty Discord")
.setDescription(`
• Discord Nitro — **30 zł / miesiąc**
• Server Boosty — **25 zł / boost**
• Members — **18 zł / 500**
`);

await interaction.reply({
embeds: [embed],
ephemeral: true
});

}

if (interaction.values[0] === "streaming") {

const embed = new EmbedBuilder()
.setTitle("Streaming")
.setDescription(`
• Disney+ — **21 zł / miesiąc**
• HBO Max — **15 zł / miesiąc**
• Paramount+ — **18 zł / miesiąc**
• YouTube Premium — **17 zł / miesiąc**
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
• Case Paradise **1 titan — 7 zł**
• Case Paradise **5 titan — 35 zł**
• Case Paradise **10 titan — 70 zł**
• Case Paradise **15 titan — 100 zł**
`);

await interaction.reply({
embeds: [embed],
ephemeral: true
});

}

});

console.log("PRÓBA LOGOWANIA");

client.login(process.env.TOKEN)
.then(() => console.log("LOGIN OK"))
.catch(err => console.error("LOGIN ERROR:", err));

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
res.send("Bot działa");
});

app.listen(PORT, () => {
console.log("Serwer działa na porcie " + PORT);
});




