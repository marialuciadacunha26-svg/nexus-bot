const canal = client.channels.cache.get(1510042475686006794);

const embed = new EmbedBuilder()
.setColor('#8A2BE2')
.setTitle(`⚔️ ${evento}`)
.setDescription(`⏰ Iniciando em ${tempo}`)
.addFields(
  { name: '🥇 1º Lugar', value: primeiro },
  { name: '🥈 2º Lugar', value: segundo },
  { name: '🥉 3º Lugar', value: terceiro }
)
.setTimestamp();

await canal.send({
  content: '@Eventos',
  embeds: [embed]
});