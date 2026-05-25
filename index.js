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

// CANAL DE AVALIAÇÃO
const CANAL_ID = '1493013153234292826';

// BOT ONLINE
client.once('ready', () => {
  console.log(`✅ Nexus online como ${client.user.tag}`);
});


// ===============================
// 🤖 IA FALSA DO NEXUS
// ===============================
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase();

  // IA responde só se falar "nexus"
  if (text.includes("nexus")) {

    const prompt = text.replace("nexus", "").trim();

    if (!prompt) {
      return message.reply("🤖 Fala algo depois do Nexus!");
    }

    const respostas = [
      "🤖 Entendi isso.",
      "🧠 Interessante... continua.",
      "💡 Posso te ajudar com isso.",
      "⚡ Faz sentido sim.",
      "👀 Hmm... boa pergunta.",
      "📌 Vou pensar nisso com você."
    ];

    if (prompt.includes("oi") || prompt.includes("olá")) {
      return message.reply("👑 Oi! Eu sou o Nexus.");
    }

    if (prompt.includes("ajuda")) {
      return message.reply("🤖 Claro! Me fala o que você precisa.");
    }

    if (prompt.includes("quem é você")) {
      return message.reply("👑 Eu sou o Nexus, uma IA do servidor.");
    }

    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    return message.reply(resposta);
  }
});


// ===============================
// ⭐ SISTEMA DE AVALIAÇÃO
// ===============================
client.on(Events.InteractionCreate, async interaction => {

  // BOTÃO
  if (interaction.isButton()) {

    if (interaction.customId === 'avaliar_staff') {

      const modal = new ModalBuilder()
        .setCustomId('modal_avaliacao')
        .setTitle('⭐ Avaliação Staff');

      const nick = new TextInputBuilder()
        .setCustomId('nick')
        .setLabel('Seu nick')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const staff = new TextInputBuilder()
        .setCustomId('staff')
        .setLabel('Staff avaliado')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const nota = new TextInputBuilder()
        .setCustomId('nota')
        .setLabel('Nota de 1 a 5')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const comentario = new TextInputBuilder()
        .setCustomId('comentario')
        .setLabel('Comentário')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      modal.addComponents(
        new ActionRowBuilder().addComponents(nick),
        new ActionRowBuilder().addComponents(staff),
        new ActionRowBuilder().addComponents(nota),
        new ActionRowBuilder().addComponents(comentario)
      );

      await interaction.showModal(modal);
    }
  }

  // MODAL ENVIADO
  if (interaction.isModalSubmit()) {

    if (interaction.customId === 'modal_avaliacao') {

      const nick = interaction.fields.getTextInputValue('nick');
      const staff = interaction.fields.getTextInputValue('staff');
      const nota = interaction.fields.getTextInputValue('nota');
      const comentario = interaction.fields.getTextInputValue('comentario');

      const embed = new EmbedBuilder()
        .setColor('#7f5cff')
        .setTitle('⭐ Nova Avaliação Staff')
        .addFields(
          { name: '👤 Usuário', value: nick, inline: true },
          { name: '🛡 Staff', value: staff, inline: true },
          { name: '⭐ Nota', value: `${nota}/5`, inline: true },
          { name: '💬 Comentário', value: comentario || 'Nenhum comentário' }
        )
        .setFooter({ text: 'Nexus System' })
        .setTimestamp();

      const canal = client.channels.cache.get(CANAL_ID);

      if (canal) {
        canal.send({ embeds: [embed] });
      }

      await interaction.reply({
        content: '✅ Avaliação enviada!',
        ephemeral: true
      });
    }
  }
});


// ===============================
// 📜 COMANDO !avaliar
// ===============================
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content === '!avaliar') {

    const embed = new EmbedBuilder()
      .setColor('#7f5cff')
      .setTitle('⭐ Sistema de Avaliação')
      .setDescription('Clique no botão para avaliar um staff.');

    const botao = new ButtonBuilder()
      .setCustomId('avaliar_staff')
      .setLabel('⭐ Avaliar Staff')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(botao);

    message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});


// LOGIN
client.login(process.env.TOKEN);