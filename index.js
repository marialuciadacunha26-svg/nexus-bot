const { Client, GatewayIntentBits } = require("discord.js");

// CRIANDO O BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// BOT ONLINE
client.once("ready", () => {
  console.log(`🤖 Nexus online como ${client.user.tag}`);
});

// IA FALSA
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase();

  // só responde se falar "nexus"
  if (!text.includes("nexus")) return;

  const prompt = text.replace("nexus", "").trim();

  if (!prompt) {
    return message.reply("🤖 Fala algo depois do Nexus!");
  }

  // respostas automáticas (IA falsa)
  const respostas = [
    "🤖 Entendi isso.",
    "🧠 Interessante... me conta mais.",
    "💡 Posso te ajudar com isso.",
    "⚡ Faz sentido sim.",
    "👀 Hmm... boa pergunta.",
    "📌 Vou pensar nisso com você."
  ];

  // respostas específicas
  if (prompt.includes("oi") || prompt.includes("olá")) {
    return message.reply("👑 Oi! Eu sou o Nexus.");
  }

  if (prompt.includes("ajuda")) {
    return message.reply("🤖 Claro! Me fala o que você precisa.");
  }

  if (prompt.includes("quem é você")) {
    return message.reply("👑 Eu sou o Nexus, uma IA simples do seu servidor.");
  }

  // resposta aleatória
  const resposta = respostas[Math.floor(Math.random() * respostas.length)];

  return message.reply(resposta);
});

// LOGIN DO BOT (Render usa variável)
client.login(process.env.TOKEN);