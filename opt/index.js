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
exports.client = void 0;
const constant_1 = require("./constant");
const discordBot_1 = require("./lib/discordBot");
const chihuyu = new discordBot_1.MyBot({
    intents: 32767,
    partials: ["MESSAGE", "USER"],
});
() => __awaiter(void 0, void 0, void 0, function* () {
    yield chihuyu.loadCogs();
    yield chihuyu.login(constant_1.discordBotToken);
    console.log("Bot is online!");
});
exports.client = chihuyu;
