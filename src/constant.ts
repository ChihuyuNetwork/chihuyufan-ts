import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '../.env') })

export const discordBotToken = process.env.DISCORD_BOT_TOKEN
export const guildId = process.env.GUILD_ID || '928978742825586708'
export const nothingChannelId =
  process.env.NOTHING_CHANNEL_ID || '938000977217331230'

if (!discordBotToken) {
  console.error('Please set bot token')
  process.exit(1)
}
