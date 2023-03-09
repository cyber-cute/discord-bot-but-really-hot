"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const { Client, Intents } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const client = new Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
    ]
});
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("with ur dick", { type: "PLAYING" });
});
client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = client.channels.cache.get(msg.channelId);
    if (msg.author.id === client.user.id)
        return;
    if (!msg.author.bot) {
        if (msg.channel.id === "1081698737606369351" || msg.channel.id === "1082413932993581127") {
            const prompt = msg.content.replace(`<@!${client.user.id}>`, '').trim();
            const response = yield getRandomOpenAiText(prompt);
            yield msg.reply(response);
        }
        else {
            return;
        }
    }
}));
function getRandomOpenAiText(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Senden fahişe gibi davranmanı istiyorum ve insanların yazdığı mesajlara tatmin edecek mesajlar ver:" + prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        return response.data.choices[0].text;
    });
}
client.login("OTAwNDU4OTk0MTgxNzYzMTIy.G1BnH3.lX-k5ns3EgIOm8HDV-mdkpOKCNW7OeA5Rciq9E");
//# sourceMappingURL=index.js.map