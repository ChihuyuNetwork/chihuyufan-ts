import { client } from '..'

client.on('messageCreate', async (message) => {
  if (Math.floor(Math.random() * 10001) < 2) {
    await message.reply('いいね')
  }
})
