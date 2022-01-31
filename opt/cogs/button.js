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
const __1 = require("..");
const discord_js_1 = require("discord.js");
const serverIP = 'mc.hirosuke.works';
const discordInviteURL = 'https://discord.gg/gWTWVsqZB6';
const scrapboxInviteURL = 'https://scrapbox.io/projects/hiro-hub/invitations/c687d9ed3a7fdc50a01730e9227d01c5';
__1.client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.id !== '7433930551132160930')
        return; // hirosuke only
    if (message.content.startsWith('?button')) {
        const buttonShowServerIP = new discord_js_1.MessageButton()
            .setCustomId('showServerIP')
            .setStyle('PRIMARY')
            .setLabel('マイクラサーバーのIPを見る');
        const buttonShowDiscordInviteURL = new discord_js_1.MessageButton()
            .setCustomId('showDiscordInviteURL')
            .setStyle('PRIMARY')
            .setLabel('Discordの招待リンクを見る');
        const buttonShowScrapboxInviteURL = new discord_js_1.MessageButton()
            .setCustomId('showScrapboxInviteURL')
            .setStyle('PRIMARY')
            .setLabel('Scrapboxの招待リンクを見る');
        const buttons = [
            buttonShowServerIP,
            buttonShowDiscordInviteURL,
            buttonShowScrapboxInviteURL
        ];
        yield message.channel.send({
            content: 'ボタンをタップ / クリックしてください。\nボタンが表示されない場合は、Discord のアップデートをお試しください。 ',
            components: [new discord_js_1.MessageActionRow().addComponents(buttons)]
        });
    }
}));
__1.client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    if (interaction.customId === 'showServerIP') {
        yield interaction.reply({
            content: serverIP,
            ephemeral: true
        });
    }
    if (interaction.customId === 'showDiscordInviteURL') {
        yield interaction.reply({
            content: discordInviteURL,
            ephemeral: true
        });
    }
    if (interaction.customId === 'showScrapboxInviteURL') {
        yield interaction.reply({
            content: scrapboxInviteURL,
            ephemeral: true
        });
    }
}));
