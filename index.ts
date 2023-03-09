import { Message,GatewayIntentBits  } from "discord.js";

const { Client, Intents } = require('discord.js');

const { Configuration, OpenAIApi } = require('openai')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,

  ]
});


const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("with ur dick", { type: "PLAYING" });
})

client.on("messageCreate", async (msg: Message) => {
  const channel = client.channels.cache.get(msg.channelId);

  if (msg.author.id === client.user.id) return;

  if (!msg.author.bot) {
    if (msg.channel.id === "1081698737606369351" || msg.channel.id === "1082413932993581127") {
      const prompt = msg.content.replace(`<@!${client.user.id}>`, '').trim();
      const response = await getRandomOpenAiText(prompt);
      await msg.reply(response);
    }
    else {
      return;
    }
  }
});

async function getRandomOpenAiText(prompt: string) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Senden karşındaki kişiyle sanal seks yapıyormuş gibi hissetmeni ve buna uygun bir şekilde cevap vermeni istiyorum cevap verirken "merhaba", "selam" gibi ifadeler kullanmak yerine kullanıcının yazdığı mesaja uygun bir şekilde erotik mesajlar yaz:  ${prompt}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
}

client.login("OTAwNDU4OTk0MTgxNzYzMTIy.G1BnH3.lX-k5ns3EgIOm8HDV-mdkpOKCNW7OeA5Rciq9E");
