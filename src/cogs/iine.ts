import { Events } from 'discord.js'
import { client } from '..'

client.on(Events.MessageCreate, async (message) => {
  if (Math.floor(Math.random() * 8000)) return
  await message.reply('いいね')
})
