const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ip",

  async execute(message) {

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("📌 Informações do Servidor")
      .setDescription("Confira o IP do servidor abaixo!")
      .addFields(
        {
          name: "🌐 IP do Servidor",
          value: "`PokeStorm01.bed.net.br`",
          inline: false
        },
        {
          name: "🚪 Porta Bedrock",
          value: "`27067`",
          inline: false
        },
        {
          name: "📢 Versão",
          value: "`Minecraft Bedrock`",
          inline: false
        }
      )
      .setFooter({
        text: "PokéStorm - Todos os direitos reservados."
      });

    message.channel.send({
      embeds: [embed