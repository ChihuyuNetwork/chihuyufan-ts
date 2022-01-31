"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordBotToken = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, "../.env") });
exports.discordBotToken = process.env.DISCORD_BOT_TOKEN;
