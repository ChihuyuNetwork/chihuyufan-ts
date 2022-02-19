import { discordBotToken } from './constant'
import { MyBot } from './lib/discordBot'

const chihuyu = new MyBot({
  intents: 32767,
  partials: ['MESSAGE', 'USER']
})

export const guildId = '928978742825586708'
;(async () => {
  await chihuyu.loadCogs()
  await chihuyu.login(discordBotToken)
  await chihuyu.application?.fetch()
  await chihuyu.application?.commands.set([], guildId)
  console.log('Bot is online!')
})()

export const client = chihuyu
