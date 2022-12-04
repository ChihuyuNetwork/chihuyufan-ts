import { Events } from 'discord.js'
import { client } from '..'

client.on(Events.MessageCreate, async (message) => {
  const pattern = /(しかし|だが)\S+に絡まれ/
  if (pattern.test(message.content)) {
    const channel = message.channel
    if (Math.floor(Math.random() * 101) > 2) {
      await channel.send('敗北...')
    } else {
      await channel.send('勝利...')
    }
  }
})
