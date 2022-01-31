import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../.env") });

export const discordBotToken = process.env.DISCORD_BOT_TOKEN;
