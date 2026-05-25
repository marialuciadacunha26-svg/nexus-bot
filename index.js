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

// ID do canal onde vai enviar avaliações
const CANAL_ID = '1493013153234292826';

// BOT ONLINE
client.once('ready', () => {
  console.log(`✅ Bot ligado como ${client.user.tag}`);
});

// INTERAÇÕES
client.on(Events.InteractionCreate, async interaction => {

  // BOTÃO
  if (interaction.isButton()) {

    if (interaction.customId === 'avaliar_staff') {

      const modal = new ModalBuilder()
        .setCustomId('modal_avaliacao')
        .setTitle('⭐ Avaliação Staff');

      // NICK
      const nick = new TextInputBuilder()
        .setCustomId('nick')
        .setLabel('Seu nick')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Digite seu nick')
        .setRequired(true);

      // STAFF
      const staff = new TextInputBuilder()
        .setCustomId('staff')
        .setLabel('Staff avaliado')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Nome do staff')
        .setRequired(true);

      // NOTA
      const nota = new TextInputBuilder()
        .setCustomId('nota')
        .setLabel('Nota de 1 a 5')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ex: 5')
        .setRequired(true);

      // COMENTÁRIO
      const comentario = new TextInputBuilder()
        .setCustomId('comentario')
        .setLabel('Comentário')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Digite sua opinião')
        .setRequired(false);

      // ROWS
      const row1 = new ActionRowBuilder().addComponents(nick);
      const row2 = new ActionRowBuilder().addComponents(staff);
      const row3 = new ActionRowBuilder().addComponents(nota);
      const row4 = new ActionRowBuilder().addComponents(comentario);

      modal.addComponents(row1, row2, row3, row4);

      await interaction.showModal(modal);
    }
  }

  // FORMULÁRIO ENVIADO
  if (interaction.isModalSubmit()) {

    if (interaction.customId === 'modal_avaliacao') {

      const nick =
        interaction.fields.getTextInputValue('nick');

      const staff =
        interaction.fields.getTextInputValue('staff');

      const nota =
        interaction.fields.getTextInputValue('nota');

      const comentario =
        interaction.fields.getTextInputValue('comentario');

      // EMBED
      const embed = new EmbedBuilder()
        .setColor('#7f5cff')
        .setTitle('⭐ Nova Avaliação Staff')
        .setDescription(
          'Uma nova avaliação foi enviada.'
        )
        .addFields(
          {
            name: '👤 Usuário',
            value: nick,
            inline: true
          },
          {
            name: '🛡 Staff',
            value: staff,
            inline: true
          },
          {
            name: '⭐ Nota',
            value: `${nota}/5`,
            inline: true
          },
          {
            name: '💬 Comentário',
            value: comentario || 'Nenhum comentário'
          }
        )
        .setFooter({
          text: 'Nexus Network • Sistema Staff'
        })
        .setTimestamp();

      // CANAL
      const canal =
        client.channels.cache.get(CANAL_ID);

      if (canal) {
        canal.send({
          embeds: [embed]
        });
      }

      // RESPOSTA
      await interaction.reply({
        content: '✅ Avaliação enviada com sucesso!',
        ephemeral: true
      });
    }
  }
});

// COMANDO
client.on('messageCreate', async message => {

  if (message.author.bot) return;

  if (message.content === '!avaliar') {

    // EMBED
    const embed = new EmbedBuilder()
      .setColor('#7f5cff')
      .setTitle('⭐ Sistema de Avaliação')
      .setDescription(
        'Clique no botão abaixo para avaliar um staff.'
      )
      .setFooter({
        text: 'Nexus Network'
      });

    // BOTÃO
    const botao = new ButtonBuilder()
      .setCustomId('avaliar_staff')
      .setLabel('⭐ Avaliar Staff')
      .setStyle(ButtonStyle.Primary);

    // ROW
    const row = new ActionRowBuilder()
      .addComponents(botao);

    // ENVIAR
    message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});

// LOGIN BOT
client.login(process.env.TOKEN);