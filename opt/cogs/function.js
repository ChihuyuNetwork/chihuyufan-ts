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
const utils_1 = require("../utils");
__1.client.on('ready', () => {
    var _a;
    const logChannel = (0, utils_1.getTextChannelById)('739078686501098240');
    const loginMessage = 'Logged in as ' + ((_a = __1.client.user) === null || _a === void 0 ? void 0 : _a.tag);
    logChannel === null || logChannel === void 0 ? void 0 : logChannel.send(loginMessage);
});
__1.client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.content.startsWith('?ping')) {
        const channel = message.channel;
        const response = yield channel.send('Pong!');
        yield response.edit('Pong!');
    }
}));
