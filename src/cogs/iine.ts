import { client } from '..'

client.on('messageCreate', async (message) => {
  if (Math.floor(Math.random() * 2000)) return
  await message.reply('いいね')
})
