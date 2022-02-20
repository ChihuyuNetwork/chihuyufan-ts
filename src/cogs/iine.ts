import { client } from '..'

client.on('messageCreate', async (message) => {
  if (Math.floor(Math.random() * 10001)) return
  await message.reply('いいね')
})
