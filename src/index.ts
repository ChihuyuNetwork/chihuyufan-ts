import { discordBotToken } from './constant'
import { MyBot } from './lib/discordBot'

const chihuyu = new MyBot({
  intents: 32767,
  partials: ['MESSAGE', 'USER']
})

;(async () => {
  await chihuyu.loadCogs()
  await chihuyu.login(discordBotToken)
  console.log('Bot is online!')
})()

export const client = chihuyu
export const guildId = '928978742825586708'
