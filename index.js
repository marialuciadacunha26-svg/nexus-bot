const {
Client,
GatewayIntentBits,
EmbedBuilder,
ButtonBuilder,
ButtonStyle,
ActionRowBuilder,
ModalBuilder,
TextInputBuilder,
TextInputStyle,
Events
} = require('discord.js');

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const TOKEN = process.env.TOKEN;
const CANAL_EVENTOS = "1510042475686006794";

client.once('ready', () => {
console.log(`✅ ${client.user.tag} online!`);
});

client.on('messageCreate', async message => {
if (message.author.bot) return;

if (message.content === '!evento') {

const embed = new EmbedBuilder()
.setColor('#7f5cff')
.setTitle('⚔️ Sistema de Eventos')
.setDescription('Clique no botão abaixo para criar um evento.');

const botao = new ButtonBuilder()
.setCustomId('criar_evento')
.setLabel('⚔️ Criar Evento')
.setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(botao);

await message.channel.send({
embeds: [embed],
components: [row]
});
}
});

client.on(Events.InteractionCreate, async interaction => {

if (interaction.isButton()) {

if (interaction.customId === 'criar_evento') {

const modal = new ModalBuilder()
.setCustomId('modal_evento')
.setTitle('⚔️ Criar Evento');

const evento = new TextInputBuilder()
.setCustomId('evento')
.setLabel('Nome do Evento')
.setStyle(TextInputStyle.Short)
.setRequired(true);

const primeiro = new TextInputBuilder()
.setCustomId('primeiro')
.setLabel('Prêmio 1º Lugar')
.setStyle(TextInputStyle.Short)
.setRequired(true);

const segundo = new TextInputBuilder()
.setCustomId('segundo')
.setLabel('Prêmio 2º Lugar')
.setStyle(TextInputStyle.Short)
.setRequired(true);

const terceiro = new TextInputBuilder()
.setCustomId('terceiro')
.setLabel('Prêmio 3º Lugar')
.setStyle(TextInputStyle.Short)
.setRequired(true);

const tempo = new TextInputBuilder()
.setCustomId('tempo')
.setLabel('Tempo para iniciar')
.setPlaceholder('30 minutos')
.setStyle(TextInputStyle.Short)
.setRequired(true);

modal.addComponents(
new ActionRowBuilder().addComponents(evento),
new ActionRowBuilder().addComponents(primeiro),
new ActionRowBuilder().addComponents(segundo),
new ActionRowBuilder().addComponents(terceiro),
new ActionRowBuilder().addComponents(tempo)
);

await interaction.showModal(modal);
}
}

if (interaction.isModalSubmit()) {

if (interaction.customId === 'modal_evento') {

const evento = interaction.fields.getTextInputValue('evento');
const primeiro = interaction.fields.getTextInputValue('primeiro');
const segundo = interaction.fields.getTextInputValue('segundo');
const terceiro = interaction.fields.getTextInputValue('terceiro');
const tempo = interaction.fields.getTextInputValue('tempo');

const embed = new EmbedBuilder()
.setColor('#7f5cff')
.setTitle(`⚔️ ${evento.toUpperCase()} EM ${tempo}`)
.addFields(
{
name: '🏆 Premiações',
value:
`🥇 1º Lugar: ${primeiro}\n` +
`🥈 2º Lugar: ${segundo}\n` +
`🥉 3º Lugar: ${terceiro}`
}
)
.setFooter({ text: 'ArcadiaMon Eventos' })
.setTimestamp();

const canal = client.channels.cache.get(CANAL_EVENTOS);

if (canal) {
await canal.send({
content: '@everyone',
embeds: [embed]
});
}

await interaction.reply({
content: '✅ Evento enviado com sucesso!',
ephemeral: true
});
}
}
});

client.login(TOKEN);