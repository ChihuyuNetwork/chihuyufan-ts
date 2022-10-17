import { REST } from '@discordjs/rest'
import { GatewayIntentBits, Partials } from 'discord.js'
import { setMaxListeners } from 'events'
import { EventEmitter, Stream } from 'stream'
import { discordBotToken } from './constant'
import { MyBot } from './lib/discordBot'

const chihuyu = new MyBot({
  intents: Number(
    Object.values(GatewayIntentBits)
      .filter(Number.isInteger)
      .reduce((a, b) => Number(a) | Number(b))
  ),
  partials: [Partials.Message, Partials.User]
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
