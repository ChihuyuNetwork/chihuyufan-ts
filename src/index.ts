import { REST } from '@discordjs/rest'
import { setMaxListeners } from 'events'
import { EventEmitter, Stream } from 'stream'
import { discordBotToken } from './constant'
import { MyBot } from './lib/discordBot'

const chihuyu = new MyBot({
  intents: 32767,
  partials: ['MESSAGE', 'USER']
})

;(async () => {
  await setMaxListeners(Infinity)
  await chihuyu.loadCogs()
  await chihuyu.login(discordBotToken)
  console.log('Bot is online!')
})()

export const client = chihuyu

export const rest = new REST({ offset: 0, version: '9' }).setToken(
  discordBotToken!
)
