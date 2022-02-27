import { client } from '..'

client.on('messageCreate', async (message) => {
  if (Math.floor(Math.random() * 8000)) return
  await message.reply('いいね')
})
