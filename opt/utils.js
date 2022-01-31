"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextChannelById = exports.isTextChannel = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const isTextChannel = (channel) => {
    return channel instanceof discord_js_1.TextChannel;
};
exports.isTextChannel = isTextChannel;
const getTextChannelById = (id) => {
    const channel = _1.client.channels.resolve(id);
    if ((0, exports.isTextChannel)(channel)) {
        return channel;
    }
    return null;
};
exports.getTextChannelById = getTextChannelById;
